import { createRole } from "../services/role-service.js";

export const createRoleController = async (req, res, next) => {
	try {
		const response = await createRole(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
