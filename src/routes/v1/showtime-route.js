import * as controller from "../../controllers/showtime-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: Showtime
 *   description: Các API quản lý suất chiếu
 */

/**
 * @swagger
 * /api/v1/showtime/by-movie/{movie_id}:
 *   get:
 *     summary: Lấy thông tin suất chiếu theo movie_id
 *     tags: [Showtime]
 *     description: |
 *       ### Mô tả:
 *       Chức năng Lấy chi tiết thông tin suất chiếu dựa trên movie_id.
 *
 *       Chức năng này một trong những quy trình sử dụng của người dùng
 *        - Kiểm tra xuất chiếu dựa trên id bộ phim người dùng muốn xem
 *        - Giúp xác định được id showtime để đặt vé
 *
 *       ### Hướng dẫn:
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của suất chiếu cần lấy thông tin
 *         - Ví dụ: `/api/v1/showtime/by-movie/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của bộ phim (movie_id)
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy danh sách thông tin suất chiếu thành công!
 *       404:
 *         description: Không tìm thấy thông tin suất chiếu!
 */

/**
 * @swagger
 * /api/v1/showtime/add:
 *   post:
 *     summary: Thêm mới suất chiếu
 *     tags: [Showtime]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, thêm mới suất chiếu cho một bộ phim trong một phòng chiếu.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Khung giờ chiếu không được trùng với các suất chiếu khác trong cùng phòng.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: string
 *               room:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 format: date-time
 *             example:
 *               movie_id: "665c412394c78f60a61b4ff1"
 *               room: "665c412394c78f60a61b4ff2"
 *               start_time: "2024-06-20T14:00:00Z"
 *     responses:
 *       201:
 *         description: Thêm suất chiếu thành công
 *       400:
 *         description: Khung giờ đã có phim chiếu
 *       404:
 *         description: Phim hoặc phòng chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/showtime:
 *   get:
 *     summary: Lấy danh sách tất cả suất chiếu
 *     tags: [Showtime]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy danh sách tất cả các suất chiếu trong hệ thống.
 *
 *       Có hỗ trợ phân trang.
 *
 *       Mặc định 10 suất chiếu / trang.
 *
 *       ### Hướng dẫn:
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *       - Ví dụ: `/api/v1/showtime?page=2` để hiện trang 2.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (tùy chọn, mặc định là 1)
 *     responses:
 *       200:
 *         description: Lấy danh sách suất chiếu thành công
 */

/**
 * @swagger
 * /api/v1/showtime/{id}:
 *   get:
 *     summary: Lấy thông tin suất chiếu theo ID
 *     tags: [Showtime]
 *     description: |
 *       ### Mô tả:
 *       Chức năng Lấy chi tiết thông tin suất chiếu dựa trên ID.
 *
 *       ### Hướng dẫn:
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của suất chiếu cần lấy thông tin)
 *         - Ví dụ: `/api/v1/showtime/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của suất chiếu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy suất chiếu thành công
 *       404:
 *         description: Suất chiếu không tồn tại
 */

/**
 * @swagger
 * /api/v1/showtime/update/{id}:
 *   put:
 *     summary: Cập nhật suất chiếu
 *     tags: [Showtime]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, cập nhật thông tin suất chiếu.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Không được trùng khung giờ với suất chiếu khác trong cùng phòng.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của suất chiếu cần cập nhật)
 *         - Ví dụ: `/api/v1/showtime/update/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của suất chiếu
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
 *               movie:
 *                 type: string
 *               room:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 format: date-time
 *             example:
 *               movie: "665c412394c78f60a61b4ff1"
 *               room: "665c412394c78f60a61b4ff2"
 *               start_time: "2024-06-21T10:00:00Z"
 *     responses:
 *       200:
 *         description: Cập nhật suất chiếu thành công
 *       400:
 *         description: Khung giờ đã có phim chiếu
 *       404:
 *         description: Suất chiếu hoặc phim không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/showtime/delete/{id}:
 *   delete:
 *     summary: Xóa suất chiếu
 *     tags: [Showtime]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: xóa suất chiếu ra khỏi hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của bộ phim cần xóa)
 *         - Ví dụ: `/api/v1/showtime/delete/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của suất chiếu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa suất chiếu thành công
 *       404:
 *         description: Suất chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

const routes = new Router();
routes.get("/", controller.getAllShowtimeController);
routes.get("/:id", controller.getShowtimeByIdController);
routes.get("/by-movie/:movie_id", controller.getShowtimeByMovieController);
routes.post("/add/", isAdmin, AdminLogger, controller.createShowtimeController);
routes.delete(
	"/delete/:id",
	AdminLogger,
	isAdmin,
	controller.deleteShowtimeController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateShowtimeController,
);

export default routes;
