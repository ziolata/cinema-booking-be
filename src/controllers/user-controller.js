import * as service from "../services/user-service.js";

export const updateProfileController = async (req, res, next) => {
	try {
		const user = req.user.id;
		const avatarPath = req.files.avatar;
		const response = await service.updateProfile(
			req.body,
			user,
			avatarPath.tempFilePath,
		);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
