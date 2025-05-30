import * as service from "../services/role-service.js";


export const createRoleController = async (req, res, next) => {
	try {
		const response = await service.createRole(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllRoleController = async (req, res, next) => {
	try {
		const response = await service.getAllRole();
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getRoleByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getRoleById(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateRoleroller = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.updateRole(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteRoleController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteRole(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
