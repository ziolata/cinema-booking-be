import * as service from "../services/ticket_type-service.js";

export const getAllTicketTypeController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const response = await service.getAllTicketType(page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getTicketTypeByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getTicketTypeById(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getTicketTypeByShowtimeController = async (req, res, next) => {
	try {
		const { showtime_id } = req.params;
		const response = await service.getTicketTypeByShowtime(showtime_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const createTicketTypeController = async (req, res, next) => {
	try {
		const response = await service.createTicketType(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateTicketTypeController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateTicketType(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteTicketTypeController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteTicketType(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
