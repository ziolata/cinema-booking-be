import * as service from "../services/auth-service.js";

export const registerController = async (req, res, next) => {
	try {
		const response = await service.register(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const loginController = async (req, res, next) => {
	try {
		const response = await service.login(req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const activateController = async (req, res, next) => {
	try {
		const { token } = req.params;
		const response = await service.activateAccount(token);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const forgotPasswordController = async (req, res, next) => {
	try {
		const response = await service.forgotPassword(req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const resetPasswordController = async (req, res, next) => {
	try {
		const { token } = req.params;
		if (req.body.password !== req.body.repassword) {
			throw { status: 400, message: "Mật khẩu không trùng khớp!" };
		}
		const response = await service.resetPassword(req.body, token);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const changePassword = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		if (req.body.password !== req.body.repassword) {
			throw { status: 400, message: "Mật khẩu không trùng khớp!" };
		}
		const response = await service.changePassword(req.body, user_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
