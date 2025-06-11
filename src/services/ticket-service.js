import ticket from "../models/ticket.js";

export const getAllTicket = async (page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		customLabels: docsToItems,
	};
	const foundTicket = await booking.paginate(user, options);
	return successResponse("Lấy danh sách tất cả vé thành công!", foundTicket);
};
