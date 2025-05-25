import room from "../models/room.js";
import { successResponse, throwError } from "../utils/response.js";

export const createRoom = async (data) => {
	const foundRoom = await room.findOne({
		name: data.name,
		cinema: data.cinema,
	});
	if (foundRoom) {
		throwError(400, "Tên phòng đã tồn tại, thêm không thành công!");
	}
	const response = await room.create(data);
	return successResponse("Thêm thành công!", { response });
};

export const getAllRoom = async () => {
	const response = await room.find().populate("seats");
	return successResponse("Lấy danh sách Phòng chiếu thành công!", {
		response,
	});
};

export const updateRoom = async (id, data) => {
	const foundRoom = await room.findById(id);
	if (!foundRoom) {
		throwError(404, "Phòng chiếu không tồn tại, cập nhật không thành công!");
	}
	if (foundRoom.name === data.name) {
		throwError(400, "Tên phòng chiếu đã tồn tại, cập nhật không thành công!");
	}
	await room.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteRoom = async (id) => {
	const foundRoom = await room.findById(id);
	if (!foundRoom) {
		throwError(404, "Phòng chiếu phim không tồn tại, xóa không thành công!");
	}
	await room.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
