import * as service from "../services/cinema-service.js";

export const createCinemaController = async (req, res, next) => {
	try {
		const response = await service.createCinema(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllCinemaController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const response = await service.getAllCinema(page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getCinemaByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getCinemaById(id);
		return res.status(200).json(response);
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
