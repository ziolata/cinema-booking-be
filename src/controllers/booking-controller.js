import * as service from "../services/booking-service.js";
import { throwError } from "../utils/response.js";

export const createBookingController = async (req, res, next) => {
	try {
		req.body.user_id = req.user.id;
		const response = await service.createBooking(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllBookingController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const response = await service.getAllBooking(page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllBookingByUserController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const user = req.user.id;
		if (!user) {
			throwError(
				404,
				"Thời gian phiên đăng nhập đã kết thúc, vui lòng đăng nhập lại!",
			);
		}
		const response = await service.getAllBookingByUser(user, page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getBookingByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getBookingById(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
export const updateBookingController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateBooking(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteBookingController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteBooking(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
