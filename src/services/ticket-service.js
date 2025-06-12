import ticket from "../models/ticket.js";
import { checkObjectId } from "../utils/checkObjectIdUtils.js";
import { successResponse, throwError } from "../utils/response.js";

const getTicketTypeOrThrowById = async (id) => {
	checkObjectId(id);
	const foundTicketType = await ticket_type.findById(id);
	if (!foundTicketType) {
		throwError(404, "Loại vé không tồn tại!");
	}
	return foundTicketType;
};

export const getAllTicket = async (page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		customLabels: docsToItems,
	};
	const foundTicket = await ticket.paginate(user, options);
	return successResponse("Lấy danh sách tất cả vé thành công!", foundTicket);
};

export const getTicketById = async (id) => {
	const foundTicket = getTicketTypeOrThrowById(id);
	return successResponse(
		`Lấy thông tin vé của id:${id} thành công!`,
		foundTicket,
	);
};

export const updateTicket = async (id, data) => {
	await getTicketTypeOrThrowById(id);
	await ticket.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteTicket = async (id) => {
	await getTicketTypeOrThrowById(id);
	await ticket.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
