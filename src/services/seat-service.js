import seat from "../models/seat.js";
import room from "../models/room.js";
import { successResponse, throwError } from "../utils/response.js";

const throwIfSeatExists = async (column, room, row) => {
	const foundColumn = await seat.findOne({
		column,
		room,
		row,
	});
	if (foundColumn) {
		throwError(400, "Chỗ ngồi đã tồn tại!");
	}
};
const checkSeatExisting = async (id) => {
	const foundSeat = await seat.findById(id);
	if (!foundSeat) {
		throwError(404, "Ghế ngồi không tồn tại");
	}
};
const checkRoomExisting = async (id) => {
	const foundRoom = await room.findById(id);
	if (!foundRoom) {
		throwError(404, "Phòng chiếu không tồn tại!");
	}
};

export const createSeat = async (data) => {
	await checkRoomExisting(data.room);
	await throwIfSeatExists(data.column, data.room, data.row);
	const response = await seat.create({
		row: data.row,
		seat_number: `${data.row + data.column}`,
		column: data.column,
		room: data.room,
		status: "available",
	});
	return successResponse("Thêm thành công!", response);
};

export const createManySeat = async (data) => {
	const seatID = [];
	await isRoomExisting(data.room);
	for (let index = 0; index < data.seatQuantity; index++) {
		const seats = await seat.create({
			row: data.row,
			seat_number: `${data.row + index}`,
			column: index,
			room: data.room,
			status: "available",
		});
		seatID.push(seats._id);
	}
	await room.findByIdAndUpdate(
		{ _id: data.room },
		{ $addToSet: { seats: { $each: seatID } } },
	);
	return successResponse("Thêm thành công!");
};

export const getAllSeat = async () => {
	const foundSeat = await seat.find();
	return successResponse("Lấy danh sách ghế ngồi thành công!", foundSeat);
};

export const getSeatById = async (id) => {
	const foundSeat = await seat.findById(id);
	if (!foundSeat) {
		throwError(404, "Ghế ngồi không tồn tại!");
	}
	return successResponse(
		`Lấy thông tin ghế ngồi có số id ${id} thành công!`,
		foundSeat,
	);
};

export const getSeatsByRoomId = async (room_id) => {
	const foundSeat = await seat.find({ room: room_id }).populate("room");
	return successResponse("Lấy danh sách ghế ngồi thành công!", foundSeat);
};

export const updateSeat = async (id, data) => {
	await checkSeatExisting(id);
	await checkRoomExisting(data.room);
	if (foundSeat.seat_number === data.seat_number) {
		throwError(400, "Mã số ghế đã tồn tại!");
	}
	await seat.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteSeat = async (id) => {
	await checkSeatExisting(id);
	await seat.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
