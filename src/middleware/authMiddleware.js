import { verifyToken } from "../utils/authUtils.js";
import { throwError } from "../utils/response.js";

export const isAuthenticated = (req, res, next) => {
	try {
		const headers = req.headers.authorization;
		if (!headers) {
			throwError(404, "Vui lòng đăng nhập để tiếp tục các tác vụ!");
		}
		const token = headers?.split(" ")[1];
		const user = verifyToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
export const isAdmin = (req, res, next) => {
	try {
		const headers = req.headers.authorization;
		const token = headers?.split(" ")[1];
		const user = verifyToken(token);
		req.user = user;
		if (req.user.role !== "admin") {
			throwError(403, "Bạn không đủ quyền để truy cập vào trang này!");
		}
		next();
	} catch (error) {
		next(error);
	}
};
