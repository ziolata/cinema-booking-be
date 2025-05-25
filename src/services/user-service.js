import User from "../models/user.js";
import { successResponse } from "../utils/response.js";
import { uploadImage } from "./cloud/cloudinary-service.js";

export const updateProfile = async (data, user, filePath) => {
	const foundUser = await User.findById(user);
	const avatar = await uploadImage(
		filePath,
		`avatar_${foundUser._id}`,
		"cinemaUser",
	);
	data.avatar = avatar;
	await User.updateOne({ _id: foundUser._id }, data);
	return successResponse("Cập nhật thành công!");
};
