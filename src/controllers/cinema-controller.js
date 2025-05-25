import * as service from "../services/cinema-service.js";

export const createCinemaController = async (req, res, next) => {
	try {
		const response = await service.createCinema(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateCinemaController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateCinema(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteCinemaController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteCinema(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
