import { comparePassword, hashPassword } from "../utils/hashUtils.js";
import { signToken, verifyToken } from "../utils/authUtils.js";
import { sendEmail } from "../utils/emailUtils.js";
import { throwError, successResponse } from "../utils/response.js";
import token from "../models/token.js";
import User from "../models/user.js";
import { generateAndStoreToken } from "../utils/userTokenUtils.js";

export const register = async (data) => {
	data.password = hashPassword(data.password);
	const foundUser = await User.findOne({ email: data.email });
	if (foundUser) {
		throwError(400, "Email đăng ký đã tồn tại!");
	}
	const response = await User.create(data);
	const activeEmailtoken = await generateAndStoreToken(
		response,
		"verify_account",
		"15m",
	);
	await sendEmail(response.email, "activate", activeEmailtoken);
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

export const activateAccount = async (tokenParam) => {
	const decodedToken = verifyToken(tokenParam);
	const tokenDoc = await token.findOne({ token: tokenParam });
	const foundUser = await User.findById(decodedToken.id);
	if (foundUser.isActive === "activated") {
		throwError(400, "Tài khoản đã được kích hoạt!");
	}
	if (!tokenDoc) {
		throwError(404, "Đường dẫn không tồn tại!");
	}
	if (tokenDoc.used !== "unused") {
		await token.updateOne({ token: tokenParam }, { used: "used" });
		throwError(400, "Đường dẫn đã được sử dụng!");
	}
	if (tokenDoc.type !== "verify_account") {
		throwError(400, "Đường dẫn này không dành cho kích hoạt tài khoản!");
	}
	await token.updateOne({ token: tokenParam }, { used: "used" });
	await User.updateOne({ _id: foundUser._id }, { isActive: "activated" });
	return successResponse("Kích hoạt tài khoản thành công!");
};

export const forgotPassword = async (data) => {
	const foundEmail = await User.findOne({ email: data.email });
	if (!foundEmail) {
		throwError(404, "Email không tồn tại!");
	}
	const forgotEmailtoken = await generateAndStoreToken(
		foundEmail,
		"reset_password",
		"15m",
	);
	console.log(forgotEmailtoken);

	await sendEmail(foundEmail.email, "reset", forgotEmailtoken);
	return successResponse("Đường dẫn lấy lại mật khẩu đã được gửi vào email!");
};

export const resetPassword = async (data, tokenParam) => {
	const decodedToken = verifyToken(tokenParam);
	const tokenDoc = await token.findOne({ token: tokenParam });
	if (!tokenDoc) {
		throwError(404, "Đường dẫn không tồn tại!");
	}
	if (tokenDoc.used !== "unused") {
		await token.updateOne({ token: tokenParam }, { used: "used" });
		throwError(400, "Đường dẫn đã được sử dụng!");
	}
	if (tokenDoc.type !== "reset_password") {
		throwError(400, "Đường dẫn này không dành cho tác vụ đặt lại mật khẩu!");
	}
	await token.updateOne({ token: tokenParam }, { used: "used" });
	// Mã hóa password bằng thư viện bcryptjs
	const hash = hashPassword(data.password);
	await User.updateOne({ _id: decodedToken.id }, { password: hash });
	return successResponse("Đổi mật khẩu thành công");
};

export const changePassword = async (data, user) => {
	const foundUser = await User.findById(user);
	if (foundUser && (await comparePassword(data.password, foundUser.password))) {
		console.log(data.password);

		if (data.newpassword === data.password) {
			throwError(
				400,
				"Bạn không thể đổi giống mật khẩu hiện tại của tài khoản!",
			);
		}
		// Mã hóa password bằng thư viện bcryptj
		const hash = hashPassword(data.newpassword);
		await User.updateOne({ _id: foundUser._id }, { password: hash });
		return successResponse("Đổi mật khẩu thành công!");
	}
};
