import User from "../models/user.js";
import { comparePassword, hashPassword } from "../utils/hashUtils.js";
import { findUserByToken, signToken } from "../utils/authUtils.js";
import { sendEmail } from "../utils/emailUtils.js";
import { throwError, successResponse } from "../utils/response.js";

export const register = async (data) => {
	data.password = hashPassword(data.password);
	const foundUser = await User.findOne({ email: data.email });
	if (foundUser) {
		throwError(400, "Email đăng ký đã tồn tại!");
	}
	const response = await User.create(data);
	const token = signToken(response, "15m");
	await sendEmail(response.email, "activate", token);
	return successResponse("Đăng ký thành công", response);
};

export const login = async (data) => {
	const foundAccount = await User.findOne({ email: data.email }).populate(
		"role",
	);
	if (!foundAccount) {
		throwError(404, "Email đăng nhập không tồn tại!");
	}

	if (
		foundAccount &&
		(await comparePassword(data.password, foundAccount.password))
	) {
		const token = signToken(foundAccount, "3d");
		const bearerToken = `Bearer ${token}`;

		return successResponse("Đăng nhập thành công", {
			access_token: bearerToken,
		});
	}
	throwError(400, "Sai mật khẩu!");
};

export const activateAccount = async (token) => {
	const foundUser = await findUserByToken(token);
	if (foundUser.isActive === "activated") {
		throwError(400, "Tài khoản đã được kích hoạt!");
	}
	await User.updateOne({ _id: foundUser._id }, { isActive: "activated" });
	return successResponse("Kích hoạt tài khoản thành công!");
};

export const forgotPassword = async (data) => {
	const foundEmail = await User.findOne({ email: data.email });
	if (!foundEmail) {
		throwError(404, "Email không tồn tại!");
	}
	const token = signToken(foundEmail, "15m");
	await User.updateOne(
		{ _id: foundEmail._id },
		{ reset_password_token: token },
	);
	await sendEmail(foundEmail.email, "reset", token);
	return successResponse("Đường dẫn lấy lại mật khẩu đã được gửi vào email!");
};

export const resetPassword = async (data, token) => {
	const foundUser = await findUserByToken(token);
	if (!foundUser.reset_password_token) {
		throwError(404, "Đường dẫn không tồn tại!");
	}
	data.password = hashPassword(data.password);
	await seat.updateMany(
		{ _id: { $in: seatIds } },
		{ $set: { status: "booked" } },
		{ session },
	);
	return successResponse("Đổi mật khẩu thành công");
};

export const changePassword = async (data, user) => {
	const foundUser = await User.findById(user);
	data.password = hashPassword(data.password);
	await User.updateOne({ _id: foundUser._id }, { password: data.password });
	return successResponse("Đổi mật khẩu thành công!");
};
