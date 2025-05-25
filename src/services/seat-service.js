import seat from "../models/seat.js";
import room from "../models/room.js";
import { successResponse, throwError } from "../utils/response.js";

export const createSeat = async (data) => {
	const foundRoom = await room.findById(data.room);
	const foundColumn = await seat.findOne({
		column: data.column,
		room: data.room,
		row: data.row,
	});

	if (foundColumn) {
		throwError(400, "Chỗ ngồi đã tồn tại!");
	}
	if (!foundRoom) {
		throwError(400, "Phòng không tồn tại, thêm chỗ ngồi thất bại!");
	}
	const response = await seat.create({
		row: data.row,
		seat_number: `${data.row + data.column}`,
		column: data.column,
		room: data.room,
		status: "available",
	});
	return successResponse("Thêm thành công!");
};

export const createManySeat = async (data) => {
	const seatID = [];
	const foundRoom = await room.findById(data.room);
	if (!foundRoom) {
		throwError(404, "Phòng không tồn tại, thêm chỗ ngồi thất bại!");
	}
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

export const updateSeat = async (id, data) => {
	const foundRoom = await room.findById(data.room);
	const foundSeat = await seat.findById(id);
	if (!foundRoom) {
		throwError(404, "Phòng chiếu phim không tồn tại, chỉnh sửa thất bại!");
	}
	if (!foundSeat) {
		throwError(404, "Chỗ ngồi không tồn tại!");
	}
	if (foundSeat.seat_number === data.seat_number) {
		throwError(400, "Mã số ghế đã tồn tại!");
	}
	const response = await seat.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteSeat = async (id) => {
	const foundSeat = await seat.findById(id);
	if (!foundSeat) {
		throwError(404, "Chỗ ngồi không tồn tại!");
	}
	await seat.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
