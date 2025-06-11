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
