import * as service from "../services/movie-service.js";

export const createMovieController = async (req, res, next) => {
	try {
		const poster = req.files.poster_url;
		req.body.poster_url = poster.tempFilePath;
		const response = await service.createMovie(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllMovieController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const response = await service.getAllMovie(page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getMovieByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getMovieById(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateMovieController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateMovie(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteMovieController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteMovie(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
