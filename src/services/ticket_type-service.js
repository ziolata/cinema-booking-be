import ticket from "../models/ticket_type.js";
import showtime from "../models/showtime.js";
import { successResponse, throwError } from "../utils/response.js";
import ticket_type from "../models/ticket_type.js";

export const createTicketType = async (data) => {
	const foundShowtime = await showtime.findById(data.showtime);
	const foundTicket = await ticket_type.findOne({
		showtime: data.showtime,
		movie_type: data.movie_type,
		time_slot: data.time_slot,
		day_type: data.day_type,
		type: data.ticket_type,
	});

	if (foundTicket) {
		throwError(404, "Loại vé đã tồn tại");
	}
	if (!foundShowtime) {
		throwError(404, "Suất chiếu không tồn tại!");
	}
	const response = await ticket.create(data);
	return successResponse("Thêm thành công!", response);
};

export const updateTicketType = async (id, data) => {
	const foundTicket = await ticket.findById(id);
	if (!foundTicket) {
		throwError(404, "Vé không tồn tại!");
	}
	if (foundTicket.name === data.name) {
		throwError(400, "Vé đã tồn tại trong hệ thống, cập nhật thất bại!");
	}
	await ticket.updateOne({ _id: id }, data);
	return successResponse("Cập nhật thành công!");
};

export const deleteTicketType = async (id) => {
	const foundTicket = await ticket.findById(id);
	if (!foundTicket) {
		throwError(404, "Vé không tồn tại!");
	}
	await ticket.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
