import Role from "../models/role.js";
import { successResponse, throwError } from "../utils/response.js";

export const createRole = async (data) => {
	const existingRole = await Role.findOne({ name: data.name });
	if (existingRole) {
		throwError(400, "Quyền đã tồn tại trong hệ thống, thêm không thành công!");
	}
	const response = await Role.create({
		name: data.name,
	});
	return successResponse("Thêm thành công!", { response });
};
