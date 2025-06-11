import cinema from "../models/cinema.js";
import { checkObjectId } from "../utils/checkObjectIdUtils.js";
import { successResponse, throwError } from "../utils/response.js";

const throwIfCinemaNameExists = async (name) => {
	const foundCinema = await cinema.findOne({ name });
	if (foundCinema) {
		throwError(400, "Rạp chiếu đã tồn tại trong hệ thống!");
	}
};

const getCinemaOrThrowById = async (id) => {
	checkObjectId(id);
	const foundCinema = await cinema.findById(id);
	if (!foundCinema) {
		throwError(404, "Rạp chiếu phim không tồn tại!");
	}
	console.log("Debug:", foundCinema);

	return foundCinema;
};

export const createCinema = async (data) => {
	await throwIfCinemaNameExists(data.name);
	const response = await cinema.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllCinema = async (page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		customLabels: docsToItems,
	};
	const foundCinema = await cinema.paginate(null, options);
	return successResponse("Lấy danh sách rạp chiếu thành công", foundCinema);
};

export const getCinemaById = async (id) => {
	const foundCinema = await getCinemaOrThrowById(id);
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
