import room from "../models/room.js";
import { successResponse, throwError } from "../utils/response.js";

const throwIfRoomNameExists = async (name) => {
	const foundRoom = await room.findOne({ name });
	if (foundRoom) {
		throwError(400, "Tên phòng đã tồn tại!");
	}
};

const getRoomOrThrowById = async (id) => {
	const foundRoom = await room.findById(id);
	if (!foundRoom) {
		throwError(404, "Phòng chiếu không tồn tại!");
	}
	return foundRoom;
};

export const createRoom = async (data) => {
	await throwIfRoomNameExists(data.name);
	const response = await room.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllRoom = async () => {
	const foundRoom = await room.find();
	return successResponse("Lấy danh sách Phòng chiếu thành công!", foundRoom);
};

export const getRoomById = async (id) => {
	const foundRoom = await getRoomOrThrowById(id);
	return successResponse(`Lấy thông tin phòng ${id} thành công!`, foundRoom);
};

export const updateRoom = async (id, data) => {
	await getRoomOrThrowById(id);
	await throwIfRoomNameExists(data.name);
	await room.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteRoom = async (id) => {
	await getRoomOrThrowById(id);
	await room.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
