import movie from "../models/movie.js";
import { successResponse, throwError } from "../utils/response.js";

export const movieSearch = async (query) => {
	const foundMovies = await movie.find(query);
	if (!foundMovies.length) {
		throwError(404, "Không tìm thấy bộ phim nào phù hợp với từ khóa tìm kiếm!");
	}
	return successResponse("Kết quả tìm kiếm", foundMovies);
};
