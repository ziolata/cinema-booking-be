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
		const response = await service.getAllRoom();
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

export const deleteCinemaController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteRoom(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
