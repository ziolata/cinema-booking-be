import booking from "../models/booking.js";
import showtime from "../models/showtime.js";
import ticketType from "../models/ticket_type.js";
import seat from "../models/seat.js";
import { throwError, successResponse } from "../utils/response.js";
import mongoose from "mongoose";
import { sendBookingEmail } from "./email-service.js";
import user from "../models/user.js";
export const createBooking = async (data) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		if (!mongoose.Types.ObjectId.isValid(data.showtime)) {
			throwError(404, "Showtime ID không hợp lệ!");
		}
		const foundShowtime = await showtime.findById(data.showtime).select("room");
		if (!foundShowtime) {
			throwError(404, "Suất chiếu không tồn tại!");
		}

		const foundTicketType = await ticketType.findOne({
			_id: data.ticket_type,
			showtime: data.showtime,
		});

		const seatIds = data.seats.map(
			(value) => new mongoose.Types.ObjectId(value.id),
		);

		const foundSeats = await seat.find({
			_id: { $in: seatIds },
			room: foundShowtime.room._id,
		});
		const foundUser = await user.findById(data.user_id);
		if (!foundTicketType) {
			throwError(404, "Vé không tồn tại!");
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
		console.log(error);

		throw error;
	} finally {
		session.endSession();
	}
};

export const updateBooking = async (id, data) => {
	const foundBooking = await booking.findById(id);
	if (!foundBooking) {
		throwError(404, "Booking không tồn tại!");
	}
	await booking.updateOne({ _id: id }, { status: data.status });
	return successResponse("Cập nhật thành công!");
};

export const deleteBooking = async (id) => {
	const foundBooking = await booking.findById(id);
	if (!foundBooking) {
		throwError(404, "Booking không tồn tại!");
	}
	await booking.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
