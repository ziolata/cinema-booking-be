import * as controller from "../../controllers/room-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Quản lý phòng chiếu
 */

/**
 * @swagger
 * /api/v1/room/add:
 *   post:
 *     summary: Thêm mới phòng chiếu
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, thêm một phòng chiếu mới vào hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Tên phòng không được trùng với phòng đã có.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cinema:
 *                 type: string
 *             example:
 *               name: Phòng chiếu 01
 *               cinema: 665d2a22189b60e623da3b11
 *
 *     responses:
 *       201:
 *         description: Thêm phòng chiếu thành công
 *       400:
 *         description: Phòng chiếu đã tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/room:
 *   get:
 *     summary: Lấy danh sách tất cả phòng chiếu
 *     tags: [Room]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy danh sách tất cả các phòng chiếu trong hệ thống.
 *
 *       API này sử dụng cơ chế phân trang để trả về danh sách phòng chiếu theo từng trang.
 *
 *       Mỗi trang mặc định hiển thị 10 phòng chiếu.
 *       ### Hướng dẫn:
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *       - Ví dụ: `/api/v1/room?page=2` để lấy danh sách trang 2
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lấy danh sách phòng chiếu thành công
 */

/**
 * @swagger
 * /api/v1/room/{id}:
 *   get:
 *     summary: Lấy chi tiết phòng chiếu
 *     tags: [Room]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy chi tiết thông tin của một phòng chiếu dựa trên ID.
 *
 *       ### Hướng dẫn:
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của phòng chiếu cần lấy thông tin)
 *       - Ví dụ: `/api/v1/room/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của phòng chiếu
 *
 *     parameters:
 *
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin phòng chiếu thành công
 *       404:
 *         description: Phòng chiếu không tồn tại
 */

/**
 * @swagger
 * /api/v1/room/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin phòng chiếu
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, cập nhật thông tin của một phòng chiếu.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Tên phòng không được trùng với phòng khác đã có.
 *
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của phòng chiếu cần cập nhật)
 *        - Ví dụ: `/api/v1/room/delete/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của phòng chiếu
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
 *               name:
 *                 type: string
 *               cinema:
 *                 type: string
 *               total_seat:
 *                 type: number
 *               seats:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               name: Phòng chiếu 02
 *               cinema: 665d2a22189b60e623da3b11
 *               total_seat: 120
 *               seats:
 *                 - 665d2f4f1a7d2be6b7b59b33
 *                 - 665d2f4f1a7d2be6b7b59b34
 *     responses:
 *       200:
 *         description: Cập nhật phòng chiếu thành công
 *       400:
 *         description: Phòng chiếu đã tồn tại
 *       404:
 *         description: Phòng chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/room/delete/{id}:
 *   delete:
 *     summary: Xóa phòng chiếu
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, xóa một phòng chiếu khỏi hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của phòng chiếu cần xóa)
 *         - Ví dụ: `/api/v1/room/delete/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của phòng chiếu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa phòng chiếu thành công
 *       404:
 *         description: Phòng chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

const routes = new Router();
routes.get("/", controller.getAllRoomController);
routes.get("/:id", controller.getRoomByIdController);
routes.post("/add/", isAdmin, AdminLogger, controller.createRoomController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteRoomController,
);
routes.put("/update/:id", isAdmin, AdminLogger, controller.updateRoomtroller);

export default routes;
