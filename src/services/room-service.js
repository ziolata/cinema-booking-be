import room from "../models/room.js";
import { checkObjectId } from "../utils/checkObjectIdUtils.js";
import { successResponse, throwError } from "../utils/response.js";

const throwIfRoomNameExists = async (name) => {
	const foundRoom = await room.findOne({ name });
	if (foundRoom) {
		throwError(400, "Phòng chiếu đã tồn tại!");
	}
};

const getRoomOrThrowById = async (id) => {
	checkObjectId(id);
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

export const getAllRoom = async (page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		customLabels: docsToItems,
	};
	const foundRoom = await room.paginate(null, options);
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
