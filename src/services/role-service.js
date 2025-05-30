import Role from "../models/role.js";
import { successResponse, throwError } from "../utils/response.js";

const throwIfRoleNameExists = async (name) => {
	const foundRole = await Role.findOne({ name });
	if (!foundRole) {
		throwError(400, "Quyền đã tồn tại trong hệ thống!");
	}
};

const getRoleOrThrowById = async (id) => {
	const foundRole = await Role.findById(id);
	if (!foundRole) {
		throwError(404, "Quyền không tồn tại!");
	}
	return foundRole;
};

export const createRole = async (data) => {
	await throwIfRoleNameExists(data.name)
	const response = await Role.create({
		name: data.name,
	});
	return successResponse("Thêm thành công!", response);
};

export const getAllRole = async()=>{
	const foundRole = await Role.find()
	return successResponse("Lấy danh sách Quyền thành công!",foundRole)
}

export const getRoleById = async(id)=>{
	const foundRole = await getRoleOrThrowById(id)
	return successResponse(`Lấy thông tin Quyền có id:${id} thành công!`, foundRole)	
}

export const updateRole = async(id,name)=>{
	await getRoleOrThrowById(id)
	await throwIfRoleNameExists(name)
	await Role.updateOne({_id:id},name)
	return successResponse("Cập nhật thành công!")
}

export const deleteRole = async(id,name)=>{
	await getRoleOrThrowById(id)
	await Role.deleteOne({_id:id})
	return successResponse("Xóa thành công!")
}