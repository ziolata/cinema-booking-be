import cinema from "../models/cinema.js";
import { successResponse, throwError } from "../utils/response.js";

const throwIfCinemaNameExists = async (name) => {
	const foundCinema = await cinema.findOne({ name });
	if (!foundCinema) {
		throwError(400, "Thể loại phim đã tồn tại trong hệ thống!");
	}
};

const getCinemaOrThrowById = async (id) => {
	const foundCinema = await cinema.findById(id);
	if (!foundCinema) {
		throwError(404, "Thể loại phim không tồn tại!");
	}
	return foundCinema;
};

export const createCinema = async (data) => {
	await throwIfCinemaNameExists(data.name);
	const response = await cinema.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllCinema = async () => {
	const foundCinema = await cinema.find();
	return successResponse("Lấy danh sách rạp chiếu thành công", foundCinema);
};

export const getCinemaById = async (id) => {
	const foundCinema = getCinemaOrThrowById(id);
	return successResponse(
		`Lấy thông tin cinema có id: ${id} thành công!`,
		foundCinema,
	);
};

export const updateCinema = async (id, data) => {
	await getCinemaOrThrowById(id);
	await throwIfCinemaNameExists(data.name);
	await cinema.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteCinema = async (id) => {
	await getCinemaOrThrowById(id);
	await cinema.deleteOne({ _id: id });
	return successResponse("Xóa thành công");
};
