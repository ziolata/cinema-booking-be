import genre from "../models/genre.js";
import { successResponse, throwError } from "../utils/response.js";

export const createGenre = async (data) => {
	const foundGenre = await genre.findOne({
		name: data.name,
	});
	if (foundGenre) {
		throwError(400, "Thể loại phim đã tồn tại trong hệ thống!");
	}
	const response = await genre.create(data);
	return successResponse("Thêm thành công!", { response });
};

export const getAllGenre = async () => {
	const response = await genre.find();
	return successResponse("Lấy danh sách thể loại thành công!", { response });
};

export const updateGenre = async (id, data) => {
	const foundGenre = await genre.findById(id);
	if (!foundGenre) {
		throw { status: 404, message: "Thể loại phim không tồn tại!" };
	}
	if (foundGenre.name === data.name) {
		throw { status: 400, message: "Thể loại phim đã tồn tại!" };
	}
	await genre.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteGenre = async (id) => {
	try {
		const foundGenre = await genre.findById(id);
		if (!foundGenre) {
			throwError(404, "Thể loại phim không tồn tại!");
		}
		await genre.deleteOne({ _id: id });
		return successResponse("Xóa thành công!");
	} catch (error) {
		console.log(error);
		throw error;
	}
};
