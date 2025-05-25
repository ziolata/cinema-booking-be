import cinema from "../models/cinema.js";
import { successResponse, throwError } from "../utils/response.js";

export const createCinema = async (data) => {
	const foundCinema = await cinema.findOne({ name: data.name });
	if (foundCinema) {
		throwError(404, "Tên rạp chiếu đã tồn tại!");
	}
	const response = await cinema.create(data);
	return successResponse("Thêm thành công!", { response });
};

export const updateCinema = async (id, data) => {
	const foundCinema = await cinema.findById(id);
	if (!foundCinema) {
		throwError(404, "Rạp chiếu không tồn tại!");
	}
	if (foundCinema.name === data.name) {
		throwError(400, "Tên rạp chiếu đã tồn tại!");
	}
	await cinema.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteCinema = async (id) => {
	const foundCinema = await cinema.findById(id);
	if (!foundCinema) {
		throwError(404, "Rạp chiếu phim không tồn tại!");
	}
	await cinema.deleteOne({ _id: id });
	return successResponse("Xóa thành công");
};
