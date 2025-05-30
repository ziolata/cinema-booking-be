import genre from "../models/genre.js";
import { successResponse, throwError } from "../utils/response.js";

const throwIfGenreNameExists = async (name) => {
	const foundGenre = await genre.findOne({ name });
	if (!foundGenre) {
		throwError(400, "Thể loại phim đã tồn tại trong hệ thống!");
	}
};

const getGenreOrThrowById = async (id) => {
	const foundGenre = await movie.findById(id);
	if (!foundGenre) {
		throwError(404, "Thể loại phim không tồn tại!");
	}
	return foundGenre;
};

export const createGenre = async (data) => {
	await throwIfGenreNameExists(data.name);
	const response = await genre.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllGenre = async () => {
	const foundGenre = await genre.find();
	return successResponse("Lấy danh sách thể loại thành công!", foundGenre);
};

export const getGenreById = async (id) => {
	const foundGenre = await ensureGenreExists(id);
	return successResponse(
		`Lấy thông tin thể loại id: ${id} thành công`,
		foundGenre,
	);
};
export const updateGenre = async (id, data) => {
	await getGenreOrThrowById(id);
	await throwIfGenreNameExists(data.name);
	await genre.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteGenre = async (id) => {
	await getGenreOrThrowById(id);
	await genre.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
