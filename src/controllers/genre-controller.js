import * as service from "../services/genre-service.js";

export const createGenreController = async (req, res, next) => {
	try {
		const response = await service.createGenre(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateGenreController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateGenre(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteGenreController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteGenre(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
