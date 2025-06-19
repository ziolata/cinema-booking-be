import genre from "../models/genre.js";
import * as service from "../services/search-service.js";

export const moviesSearchController = async (req, res, next) => {
	try {
		const { keyword, genreName } = req.query;

		const query = {};

		if (keyword) {
			query.title = { $regex: keyword, $options: "i" }; // Tìm gần đúng, không phân biệt hoa thường
		}

		if (genreName) {
			// Tìm kiếm theo tên genre để kiểm tra genre đang query có tồn tại không
			const foundGenre = await genre.findOne({ name: genreName });
			if (!foundGenre) {
				throwError(404, "Thể loại không tồn tại!");
			}
			// Gán tên query theo dạng Objectid
			query.genre = foundGenre._id;
		}

		const result = await service.movieSearch(query);

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
