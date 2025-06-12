import booking from "../models/booking.js";
import showtime from "../models/showtime.js";
import ticketType from "../models/ticket_type.js";
import seat from "../models/seat.js";
import { throwError, successResponse } from "../utils/response.js";
import mongoose from "mongoose";
import { sendBookingEmail } from "./email-service.js";
import user from "../models/user.js";
import { checkObjectId } from "../utils/checkObjectIdUtils.js";

const getBookingOrThrowById = async (id) => {
	checkObjectId(id);
	const foundBooking = await booking.findById(id);
	if (!foundBooking) {
		throwError(404, "Phòng chiếu không tồn tại!");
	}
	return foundBooking;
};

export const createBooking = async (data) => {
	// Bắt đầu transaction đảm bảo dữ liệu đồng bộ nếu có lỗi
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		// Kiểm tra các dữ liệu id phù hợp với ObjectID của moongose
		const seatIds = data.seats.map((value) => value.id);
		const objectId = [
			data.showtime,
			data.ticket_type,
			data.user_id,
			seatIds,
		].flat();
		objectId.forEach(checkObjectId);

		const foundShowtime = await showtime.findById(data.showtime).select("room");
		if (!foundShowtime) {
			throwError(404, "Suất chiếu không tồn tại!");
		}
		const foundTicketType = await ticketType.findOne({
			_id: data.ticket_type,
			showtime: data.showtime,
		});

		const foundSeats = await seat.find({
			_id: { $in: seatIds },
			room: foundShowtime.room._id,
		});

		const foundUser = await user.findById(data.user_id);

		if (!foundTicketType) {
			throwError(404, "Loại vé không tồn tại!");
		}
		if (foundSeats.length !== seatIds.length) {
			throwError(404, "Một số ghế không tồn tại hoặc không hợp lệ!");
		}
		const unavailableSeats = foundSeats.filter(
			(seat) => seat.status !== "available",
		);

		if (unavailableSeats.length > 0) {
			throwError(400, "Một số ghế đã được đặt trước!");
		}
		await seat.updateMany({ _id: seatIds }, { status: "booked" }, { session });

		const response = await booking.create(
			[
				{
					user_id: data.user_id,
					showtime: data.showtime,
					ticket_type: data.ticket_type,
					seats: seatIds,
					price: foundTicketType.price * seatIds.length,
					status: "unpaid",
				},
			],
			{ session },
		);

		await session.commitTransaction();
		await sendBookingEmail(foundUser.email, "http://cinemaz.com");
		return successResponse("Booking Thành công", response);
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const getAllBooking = async (page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		customLabels: docsToItems,
	};
	const foundBooking = await booking.paginate(null, options);
	return successResponse("Lấy danh sách booking thành công!", foundBooking);
};

export const getAllBookingByUser = async (user, page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		customLabels: docsToItems,
	};
	const foundBooking = await booking.paginate({ user }, options);
	return successResponse(
		`Lấy danh sách booking của id ${user} thành công!`,
		foundBooking,
	);
};

export const getBookingById = async (id) => {
	const foundBooking = await getBookingOrThrowById(id);
	return successResponse(
		`Lấy thông tin booking có id: ${id} thành công!`,
		foundBooking,
	);
};

export const updateBooking = async (id, data) => {
	await getBookingOrThrowById(id);
	const foundBooking = await booking.findById(id);
	if (!foundBooking) {
		throwError(404, "Booking không tồn tại!");
	}
	await booking.updateOne({ _id: id }, { status: data.status });
	return successResponse("Cập nhật thành công!");
};

export const deleteBooking = async (id) => {
	await getBookingOrThrowById(id);
	const foundBooking = await booking.findById(id);
	if (!foundBooking) {
		throwError(404, "Booking không tồn tại!");
	}
	await booking.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
