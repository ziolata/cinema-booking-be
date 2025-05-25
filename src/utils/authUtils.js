import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { throwError } from "./response.js";
export const verifyToken = (token) => {
	try {
		if (!token) {
			throwError(401, "Token không tồn tại!");
		}
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			throwError(404, "Yêu cầu đã hết thời gian!");
		}
		if (error.name === "JsonWebTokenError") {
			throwError(400, "Token không hợp lệ!");
		}
		throwError(500, "Lỗi xác thực token");
	}
};
export const signToken = (data, expire) => {
	const token = jwt.sign(
		{
			id: data._id,
			email: data.email,
			role: data.role.name,
			isActive: data.isActive,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: expire,
		},
	);
	return token;
};
export const findUserByToken = async (token) => {
	const decode = verifyToken(token);
	const foundUser = await user.findById(decode.id);
	return foundUser;
};
