import movie from "../models/movie.js";
import { successResponse, throwError } from "../utils/response.js";
import { uploadImage } from "./cloud/cloudinary-service.js";

export const createMovie = async (data) => {
	const foundMovie = await movie.findOne({
		title: data.title,
	});
	if (foundMovie) {
		throwError(400, "Bộ phim đã tồn tại trong hệ thống!");
	}
	data.poster_url = await uploadImage(
		data.poster_url,
		`Movie_${data.title}`,
		"MoviePoster",
	);
	const response = await movie.create(data);
	return successResponse("Thêm thành công!", { response });
};

export const getAllMovie = async () => {
	const response = await movie.find();
	return successResponse("Lấy danh sách phim thành công!", { response });
};

export const updateMovie = async (id, data) => {
	const foundMovie = await movie.findById(id);
	if (!foundMovie) {
		throwError(404, "Bộ phim không tồn tại!");
	}
	if (foundMovie.title === data.title) {
		throwError(400, "Bộ phim đã tồn tại!");
	}
	await movie.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteMovie = async (id) => {
	const foundMovie = await movie.findById(id);
	if (!foundMovie) {
		throwError(404, "Bộ phim đã không tồn tại!");
	}
	await movie.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
