import * as service from "../services/booking-service.js";

export const createBookingController = async (req, res, next) => {
	try {
		req.body.user_id = req.user.id;
		const response = await service.createBooking(req.body);
		return res.status(201).json(response);
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
