import * as service from "../services/ticket_type-service.js";

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
