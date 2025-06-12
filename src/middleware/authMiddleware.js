import booking from "../models/booking.js";
import { verifyToken } from "../utils/authUtils.js";

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

export const authorizeBookingUpdate = async (req, res, next) => {
	try {
		const headers = req.headers.authorization;
		const token = headers?.split(" ")[1];
		const user = verifyToken(token);
		req.user = user;

		const { role, id: userId } = req.user;
		const { id: bookingId } = req.params;

		// Nếu Admin: cho phép tất cả
		if (role === "admin") return next();

		// Nếu User: Chỉ cho phép update status = 'cancel'
		const { status, ...rest } = req.body;

		if (Object.keys(rest).length > 0) {
			return res.status(403).json({
				success: false,
				message: "Bạn chỉ được phép cập nhật trạng thái booking!",
			});
		}

		if (status !== "cancel") {
			return res.status(403).json({
				success: false,
				message: "Bạn chỉ được phép huỷ booking.",
			});
		}

		// Kiểm tra booking có thuộc user không
		const foundBooking = await booking.findOne({
			_id: bookingId,
			user_id: userId,
		});

		if (!foundBooking) {
			return res.status(403).json({
				success: false,
				message: "Bạn không thể huỷ booking của user khác!",
			});
		}

		next();
	} catch (error) {
		next(error);
	}
};
