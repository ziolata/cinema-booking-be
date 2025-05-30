import * as service from "../services/user-service.js";

export const updateUserController = async (req, res, next) => {
	try {
		const user = req.user.id;
		data.user_id = user
		const avatarPath = req.files.avatar;
		data.avatar = avatarPath
		const response = await service.updateUser(
			req.body,
			user,
		);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
export const getAllUserController = async (req, res, next) => {
	try {
		const response = await service.getAllUser();
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


export const deleteUserController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.deleteUser(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
