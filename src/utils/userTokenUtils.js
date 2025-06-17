import token from "../models/token.js";
import { signToken, verifyToken } from "./authUtils.js";

export const generateAndStoreToken = async (
	user,
	type,
	expiresIn = "15m",
	targetEmail = null,
) => {
	// Tạo token dựa trên thông tin tại khoản đang đăng nhập
	const createdToken = signToken(user, expiresIn);
	// decode để lấy thông tin hạn của token (exp)
	const decodedToken = verifyToken(createdToken);
	// Lưu lại thông tin vào collection token để so sánh khi xác nhận link xác nhận từ email
	await token.create({
		user_id: user._id,
		token: createdToken,
		type,
		expiresAt: decodedToken.exp,
		targetEmail,
	});

	return createdToken;
};
