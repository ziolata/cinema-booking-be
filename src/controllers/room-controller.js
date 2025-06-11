import * as service from "../services/room-service.js";

export const createRoomController = async (req, res, next) => {
	try {
		const response = await service.createRoom(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllRoomController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const response = await service.getAllRoom(page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getRoomByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getRoomById(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateRoomtroller = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateRoom(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteRoomController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteRoom(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
