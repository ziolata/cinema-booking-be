import * as service from "../services/user-service.js";

export const updateUserController = async (req, res, next) => {
	try {
		const role = req.user.role;
		const user_id = req.user.id;
		const targetUserId =
			role === "admin" && req.params.id ? req.params.id : user_id;
		if (req.files) {
			const avatarPath = req.files.avatar;
			req.body.avatar = avatarPath;
		}
		const response = await service.updateUser(targetUserId, role, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllUserController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const response = await service.getAllUser(page, limit);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getUserByIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.getUserById(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const confirmChangeEmailController = async (req, res, next) => {
	try {
		const { token } = req.params;
		const response = await service.confirmChangeEmail(token);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteUserController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteUser(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
