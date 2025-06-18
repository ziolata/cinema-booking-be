import * as controller from "../../controllers/ticket_type-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: TicketType
 *   description: Các API quản lý loại vé
 */

/**
 * @swagger
 * /api/v1/ticket-type/add:
 *   post:
 *     summary: Thêm mới loại vé
 *     tags: [TicketType]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: thêm mới loại vé cho một suất chiếu cụ thể.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       Các loại vé không được trùng thông tin: suất chiếu, loại phim, khung giờ, loại ngày, loại vé.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showtime:
 *                 type: string
 *               movie_type:
 *                 type: string
 *                 enum: [2D, 3D, IMAX]
 *               time_slot:
 *                 type: string
 *                 enum: [morning, afternoon, evening]
 *               day_type:
 *                 type: string
 *                 enum: [weekday, weekend, holiday]
 *               ticket_type:
 *                 type: string
 *                 enum: [adult, child, combo]
 *               price:
 *                 type: number
 *             example:
 *               showtime: "665c412394c78f60a61b4ff3"
 *               movie_type: "2D"
 *               time_slot: "morning"
 *               day_type: "weekday"
 *               ticket_type: "adult"
 *               price: 80000
 *     responses:
 *       201:
 *         description: Thêm loại vé thành công
 *       400:
 *         description: Loại vé đã tồn tại
 *       404:
 *         description: Suất chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/ticket-type:
 *   get:
 *     summary: Lấy danh sách tất cả loại vé
 *     tags: [TicketType]
 *     description: |
 *       ### Mô tả:
 *       API lấy danh sách tất cả các loại vé.
 *
 *       Có hỗ trợ phân trang.
 *
 *       Mặc định 10 loại vé / trang.
 *
 *       ### Hướng dẫn:
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *       - Ví dụ: `/api/v1/ticket-type?page=2` để lấy danh sách trang 2
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (tùy chọn, mặc định là 1)
 *     responses:
 *       200:
 *         description: Lấy danh sách loại vé thành công
 */

/**
 * @swagger
 * /api/v1/ticket-type/{id}:
 *   get:
 *     summary: Lấy thông tin loại vé theo ID
 *     tags: [TicketType]
 *     description: |
 *       ### Mô tả:
 *       Lấy chi tiết thông tin loại vé dựa trên ID.
 *
 *       ### Hướng dẫn:
 *       Truyền ID loại vé vào param.
 *       - Ví dụ: `/api/v1/ticket-type/665c412394c78f60a61b4ff3` trong đó 665c412394c78f60a61b4ff3 là id cần truyền vào
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy loại vé thành công
 *       404:
 *         description: Loại vé không tồn tại
 */

/**
 * @swagger
 * /api/v1/ticket-type/update/{id}:
 *   put:
 *     summary: Cập nhật loại vé
 *     tags: [TicketType]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: cập nhật thông tin loại vé.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       Các loại vé không được trùng thông tin: suất chiếu, loại phim, khung giờ, loại ngày, loại vé.
 *
 *       Truyền ID loại vé vào param.
 *       - Ví dụ: `/api/v1/ticket-type/665c412394c78f60a61b4ff3` trong đó 665c412394c78f60a61b4ff3 là id cần truyền vào
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showtime:
 *                 type: string
 *               movie_type:
 *                 type: string
 *                 enum: [2D, 3D, IMAX]
 *               time_slot:
 *                 type: string
 *                 enum: [morning, afternoon, evening]
 *               day_type:
 *                 type: string
 *                 enum: [weekday, weekend, holiday]
 *               ticket_type:
 *                 type: string
 *                 enum: [adult, child, combo]
 *               price:
 *                 type: number
 *             example:
 *               showtime: "665c412394c78f60a61b4ff3"
 *               movie_type: "3D"
 *               time_slot: "evening"
 *               day_type: "weekend"
 *               ticket_type: "child"
 *               price: 70000
 *     responses:
 *       200:
 *         description: Cập nhật loại vé thành công
 *       400:
 *         description: Loại vé đã tồn tại
 *       404:
 *         description: Loại vé không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/ticket-type/delete/{id}:
 *   delete:
 *     summary: Xóa loại vé
 *     tags: [TicketType]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: xóa loại vé khỏi hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       Truyền ID loại vé vào param.
 *       - Ví dụ: `/api/v1/ticket-type/delete/665c412394c78f60a61b4ff3`
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa loại vé thành công
 *       404:
 *         description: Loại vé không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

const routes = new Router();
routes.get("/", controller.getAllTicketTypeController);
routes.get("/:id", controller.getTicketTypeByIdController);
routes.post(
	"/add/",
	isAdmin,
	AdminLogger,
	controller.createTicketTypeController,
);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteTicketTypeController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateTicketTypeController,
);

export default routes;
