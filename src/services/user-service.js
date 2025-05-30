import User from "../models/user.js";
import { successResponse, throwError } from "../utils/response.js";
import { uploadImage } from "./cloud/cloudinary-service.js";

const getUserOrThrowById = async (id) => {
	const foundUser = await User.findById(id);
	if (!foundUser) {
		throwError(404, "Người dùng không tồn tại!");
	}
	return foundUser;
};

export const getAllUser = async () => {
	const foundUser = await User.find();
	return successResponse("Lấy danh sách người dùng thành công!", foundUser);
};

export const getUserById = async (id) => {
	const foundUser = await User.getUserOrThrowById(id);
	return successResponse(
		`Lấy thông tin của user có id: ${id} thành công!`,
		foundUser,
	);
};

export const updateUser = async (user_id, data) => {
	await getUserOrThrowById(user_id);
	if (data.avatar) {
		const avatar = await uploadImage(
			data.avatar,
			`avatar_${foundUser._id}`,
			"cinemaUser",
		);
		data.avatar = avatar;
	}
	await User.updateOne({ _id: user_id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteUser = async (id) => {
	await getUserOrThrowById(id);
	await User.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
