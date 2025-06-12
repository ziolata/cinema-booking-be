import { AdminLog } from "../models/adminLog.js";

export const AdminLogger = async (req, res, next) => {
	// Lấy tên model trong endpoint
	const target = req.originalUrl.split("/");
	if (
		req.method === "POST" ||
		req.method === "DELETE" ||
		req.method === "PUT" ||
		(req.method === "PATCH" && res.statusCode >= 200 && res.statusCode < 300)
	) {
		const log = AdminLog({
			admin_id: req.user.id,
			action: req.method,
			target: target[3],
			target_id: req.params?.id || null,
			description: `${req.method} ${target[3]} ${req.params?.id || ""}`,
			ip_address: req.ip,
		});
		await log.save();
	}
	next();
};
