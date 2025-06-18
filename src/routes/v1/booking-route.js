import * as controller from "../../controllers/booking-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Các API quản lý đặt vé
 */

/**
 * @swagger
 * /api/v1/booking/add:
 *   post:
 *     summary: Đặt vé
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng cho phép người dùng đặt vé xem phim.
 *
 *       - Kiểm tra suất chiếu hợp lệ
 *       - Kiểm tra loại vé phù hợp
 *       - Kiểm tra ghế còn trống
 *       - Gửi email thông báo sau khi đặt vé thành công cho email đăng ký tài khoản
 *
 *       Yêu cầu đăng nhập để sử dụng.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu xác thực đăng nhập, nên để chức năng hoạt động thì cần phải nhập token vào cột Authorize trước khi sử dụng.
 *
 *       Truyền đúng định dạng ObjectId cho các trường user_id, showtime, ticket_type, seats.
 *
 *       Truyền danh sách ghế theo cấu trúc:
 *         ```json
 *         "seats": [
 *            { "id": "seatId1" },
 *            { "id": "seatId2" }
 *         ]
 *         ```
 *
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               showtime:
 *                 type: string
 *               ticket_type:
 *                 type: string
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *               email:
 *                 type: string
 *             example:
 *
 *               showtime: "665c412394c78f60a61b4ff3"
 *               ticket_type: "665c412394c78f60a61b4ff3"
 *               seats:
 *                 - { "id": "665c412394c78f60a61b4ff3" }
 *                 - { "id": "665c412394c78f60a61b4ff4" }
 *
 *     responses:
 *       201:
 *         description: Đặt vé thành công
 *       400:
 *         description: Một số ghế đã được đặt trước
 *       404:
 *         description: Suất chiếu, loại vé hoặc ghế không tồn tại
 *       401:
 */

/**
 * @swagger
 * /api/v1/booking/all:
 *   get:
 *     summary: Lấy tất cả booking (Admin)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng cho phép Admin lấy danh sách tất cả các booking trong hệ thống.
 *
 *       API này sử dụng cơ chế phân trang để trả về danh sách booking theo từng trang.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 *
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *        - Ví dụ: `/api/v1/booking/all?page=2` để lấy danh sách trang 2
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (tùy chọn, mặc định là 1)
 *     responses:
 *       200:
 *         description: Lấy danh sách booking thành công
 */

/**
 * @swagger
 * /api/v1/booking:
 *   get:
 *     summary: Lấy tất cả booking của người dùng hiện tại
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng cho phép user lấy danh sách tất cả các booking của chính user đó (tự động lấy từ token).
 *
 *       API này sử dụng cơ chế phân trang để trả về danh sách booking theo từng trang.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu xác thực đăng nhập, nên để chức năng hoạt động thì cần phải nhập token vào cột Authorize trước khi sử dụng.
 * 
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *        - Ví dụ: `/api/v1/booking?page=2` để lấy danh sách trang 2
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (tùy chọn, mặc định là 1)
 *     responses:
 *       200:
 *         description: Lấy danh sách booking của user thành công

 */

/**
 * @swagger
 * /api/v1/booking/update/{id}:
 *   put:
 *     summary: Cập nhật trạng thái booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng:
 *        - Người dùng có thể hủy vé (chỉ được update từ  status = unpaid sang status = cancel).
 *        - Admin có thể cập nhật tất cả các trạng thái.
 *
 *       Khi Admin sử dụng chức năng này sẽ bị ghi lại vào AdminLogs.
 *
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu xác thực đăng nhập, nên để chức năng hoạt động thì cần phải nhập token vào cột Authorize trước khi sử dụng.
 * 
 *       Người dùng thường chỉ được cập nhật trạng thái từ `unpaid` sang `cancel`.
 *       
 *       Admin có thể cập nhật sang các trạng thái khác (`unpaid`, `paid`, `cancel`).
 * 
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của rạp chiếu cần lấy thông tin)
 *       - Ví dụ: `/api/v1/booking/update/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id booking
 *
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
 *               status:
 *                 type: string
 *                 enum: [unpaid, paid, cancel]
 *             example:
 *               status: cancel
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *       403:
 *         description: Không có quyền cập nhật trạng thái này
 *       404:
 *         description: Booking không tồn tại

 */

/**
 * @swagger
 * /api/v1/booking/delete/{id}:
 *   delete:
 *     summary: Xóa booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, xóa booking khỏi hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *        Chức năng yêu cầu **token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 *
 *        Truyền ID loại vé vào tham số (Tham số `id` là id của rạp chiếu cần lấy thông tin)
 *         - Ví dụ: `/api/v1/booking/update/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id booking
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa booking thành công
 *       404:
 *         description: Booking không tồn tại
 */

const routes = new Router();
routes.post("/add", isAuthenticated, controller.createBookingController);
routes.get("/all", isAdmin, controller.getAllBookingController);
routes.get("/", isAuthenticated, controller.getAllBookingByUserController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteBookingController,
);
routes.put(
	"/update/:id",
	isAuthenticated,
	AdminLogger,
	controller.updateBookingController,
);

export default routes;
