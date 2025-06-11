import movie from "../models/movie.js";
import { checkObjectId } from "../utils/checkObjectIdUtils.js";
import { successResponse, throwError } from "../utils/response.js";
import { uploadImage } from "./cloud/cloudinary-service.js";

const throwIfMovieTitleExists = async (title) => {
	const foundMovie = await movie.findOne({ title });
	if (foundMovie) {
		throwError(400, "Bộ phim đã tồn tại trong hệ thống!");
	}
};

const getMovieOrThrowById = async (id) => {
	checkObjectId(id);
	const foundMovie = await movie.findById(id);
	if (!foundMovie) {
		throwError(404, "Bộ phim không tồn tại!");
	}
	return foundMovie;
};

export const createMovie = async (data) => {
	await throwIfMovieTitleExists(data.title);
	data.poster_url = await uploadImage(
		data.poster_url,
		`Movie_${data.title}`,
		"MoviePoster",
	);
	const response = await movie.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllMovie = async (page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		customLabels: docsToItems,
		sort: { release_date: -1 },
	};
	const foundMovie = await movie.paginate(null, options);
	return successResponse("Lấy danh sách phim thành công!", foundMovie);
};

export const getMovieById = async (id) => {
	const foundMovie = await getMovieOrThrowById(id);
	return successResponse(
		`Lấy thông tin bộ phim có id: ${id} thành công!`,
		foundMovie,
	);
};
export const updateMovie = async (id, data) => {
	await getMovieOrThrowById(id);
	await throwIfMovieTitleExists(data.title);
	if (data.poster_url) {
		data.poster_url = await uploadImage(
			data.poster_url,
			`Movie_${data.title}`,
			"MoviePoster",
		);
	}
	await movie.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteMovie = async (id) => {
	await getMovieOrThrowById(id);
	await movie.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
