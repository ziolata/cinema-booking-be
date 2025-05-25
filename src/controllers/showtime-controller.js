import * as service from "../services/showtime_service.js";

export const createShowtimeController = async (req, res, next) => {
	try {
		const response = await service.createShowtime(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateShowtimeController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateShowtime(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteShowtimeController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteShowtime(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
