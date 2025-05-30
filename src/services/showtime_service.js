import showtime from "../models/showtime.js";
import movie from "../models/movie.js";
import { addMinutes } from "../utils/time.js";
import room from "../models/room.js";
import { successResponse, throwError } from "../utils/response.js";

const isOverlappingShowtime = async ({ roomId, startTime, endTime }) => {
	const query = {
		room: roomId,
		start_time: { $lt: endTime },
		end_time: { $gt: startTime },
	};
	return await showtime.findOne(query);
};

const getShowtimeOrThrowById = async (id) => {
	const foundRoom = await room.findById(id);
	if (!foundRoom) {
		throwError(404, "Phòng chiếu không tồn tại!");
	}
	return foundRoom;
};

export const createShowtime = async (data) => {
	const foundMovie = await movie.findById(data.movie_id);
	const foundRoom = await isRoomExisting(data.room);
	const end_time = addMinutes(data.start_time, foundMovie.duration);
	data.end_time = end_time;
	const foundShowtime = await isOverlappingShowtime({
		roomId: data.room,
		startTime: data.start_time,
		endTime: end_time,
	});
	if (!foundMovie) {
		throwError(404, "Bộ phim trong suất chiếu không tồn tại!");
	}
	if (foundShowtime) {
		throwError(400, "Khung giờ này đã có bộ phim để chiếu!");
	}
	const availableSeats = foundRoom.seats.filter(
		(seat) => seat.status === "available",
	);
	const total_seat = availableSeats.length;
	data.available_seats = total_seat;
	const response = await showtime.create(data);
	return successResponse("Thêm thành công", response);
};

export const getShowtimeById = async (id) => {
	const foundShowtime = await getShowtimeOrThrowById(id);
	return successResponse(
		`Lấy danh sách thông tin suất chiếu ${id} thành công!`,
		foundShowtime,
	);
};

export const getAllShowtime = async () => {
	const response = await showtime.find().populate("movie").populate("room");
	return successResponse("Lấy danh sách chiếu thành công!", response);
};

export const updateShowtime = async (id, data) => {
	await getShowtimeOrThrowById(id);
	const foundMovie = await movie.findById(data.movie);
	if (!foundMovie) {
		throwError(404, "Không tìm thấy dữ liệu phim!");
	}
	const end_time = addMinutes(data.start_time, foundMovie.duration);
	data.end_time = end_time;
	const foundShowtime = await isOverlappingShowtime({
		roomId: data.room,
		startTime: data.start_time,
		endTime: end_time,
	});
	if (foundShowtime) {
		throwError(400, "Khung giờ này đã có bộ phim để chiếu!");
	}
	await showtime.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteShowtime = async (id) => {
	await getShowtimeOrThrowById(id);
	await showtime.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
