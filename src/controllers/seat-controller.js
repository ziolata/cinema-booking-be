import * as service from "../services/seat-service.js";

export const createSeatController = async (req, res, next) => {
	try {
		const response = await service.createSeat(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const createManySeatController = async (req, res, next) => {
	try {
		const response = await service.createManySeat(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateSeatController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateSeat(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteSeatController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteSeat(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
