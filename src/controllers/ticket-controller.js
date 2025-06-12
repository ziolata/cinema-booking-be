import * as service from "../services/ticket-service.js";

export const getAllTicketController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const response = await service.getAllTicket(page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getTicketByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getTicketById(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateTicketController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateTicket(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteTicketController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteTicket(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
