import showtime from "../models/showtime.js";
import ticket_type from "../models/ticket_type.js";
import { successResponse, throwError } from "../utils/response.js";

const getTicketTypeOrThrowById = async (id) => {
	const foundTicketType = await ticket_type.findById(id);
	if (!foundTicketType) {
		throwError(404, "Loại vé không tồn tại!");
	}
	return foundTicketType;
};

const throwIfTicketTypeExists = async (filter) => {
	const query = { ...filter };
	const foundTicketType = await ticket_type.findOne(query);
	if (foundTicketType) {
		throwError(400, "Loại vé đã tồn tại");
	}
};

export const createTicketType = async (data) => {
	await throwIfTicketTypeExists({
		showtime: data.showtime,
		movie_type: data.movie_type,
		time_slot: data.time_slot,
		day_type: data.day_type,
		type: data.ticket_type,
	});
	const foundShowtime = await showtime.findById(data.showtime);
	if (!foundShowtime) {
		throwError(404, "Suất chiếu không tồn tại!");
	}
	const response = await ticket.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllTicketType = async () => {
	const foundTicketType = await ticket_type.find();
	return successResponse(
		"Lấy danh sách các loại vé thành công!",
		foundTicketType,
	);
};
export const getTicketTypeById = async (id) => {
	const foundTicketType = await getTicketTypeOrThrowById(id);
	return successResponse(
		`Lấy thông tin loại vé có id: ${id} thành công!`,
		foundTicketType,
	);
};
export const updateTicketType = async (id, data) => {
	await getTicketTypeOrThrowById(id);
	await throwIfTicketTypeExists({
		showtime: data.showtime,
		movie_type: data.movie_type,
		time_slot: data.time_slot,
		day_type: data.day_type,
		type: data.ticket_type,
	});
	await ticket.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteTicketType = async (id) => {
	await getTicketTypeOrThrowById(id);
	await ticket.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
