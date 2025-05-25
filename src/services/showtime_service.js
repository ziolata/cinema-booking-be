import showtime from "../models/showtime.js";
import movie from "../models/movie.js";
import { addMinutes } from "../utils/time.js";
import room from "../models/room.js";
import { successResponse, throwError } from "../utils/response.js";

export const createShowtime = async (data) => {
	const foundMovie = await movie.findById(data.movie_id);
	const foundRoom = await room.findById(data.room).populate("seats");
	const end_time = addMinutes(data.start_time, foundMovie.duration);
	data.end_time = end_time;
	const foundShowtime = await showtime.findOne({
		room: data.room,
		start_time: { $lt: end_time },
		end_time: { $gt: data.start_time },
	});

	if (!foundMovie) {
		throwError(404, "Bộ phim trong suất chiếu không tồn tại!");
	}
	if (!foundRoom) {
		throwError(404, "Phòng chiếu trong suất chiếu không tồn tại!");
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
	return successResponse("Thêm thành công", { response });
};

export const getAllShowtime = async () => {
	const response = await showtime.find().populate("movie").populate("room");
	return successResponse("Lấy danh sách chiếu thành công!", { response });
};

export const updateShowtime = async (id, data) => {
	const foundMovie = await movie.findById(data.movie);
	if (!foundMovie) {
		throwError(404, "Không tìm thấy dữ liệu phim!");
	}
	const end_time = addMinutes(data.start_time, foundMovie.duration);
	data.end_time = end_time;
	const foundShowtime = await showtime.findOne({
		room: data.room,
		start_time: { $lt: end_time },
		end_time: { $gt: data.start_time },
	});
	if (foundShowtime) {
		throwError(400, "Khung giờ này đã có bộ phim để chiếu!");
	}
	await showtime.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteShowtime = async (id) => {
	const foundShowtime = await showtime.findById(id);
	if (!foundShowtime) {
		throw { status: 404, message: "Suất chiếu không tồn tại!" };
	}
	await showtime.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
