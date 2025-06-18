import * as controller from "../../controllers/seat-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: Các API quản lý ghế ngồi
 */

/**
 * @swagger
 * /api/v1/seat/add:
 *   post:
 *     summary: Thêm mới ghế ngồi
 *     tags: [Seat]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, thêm một ghế ngồi mới vào hệ thống.
 *
 *       Khi thêm thành công ghế ngồi, thì nó sẽ tự cập nhật vào trường Seats của Room theo id Room được truyền vào
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền đầy đủ thông tin theo định dạng trong **example value**.
 *        - Ví dụ: row: A (hàng A), column (cột 1) ghế này ở vị trí đầu tiên từ trái sang phải
 *        - Trường room có ý nghĩa là sau ghi được tạo thành công thì ghế ngồi này thuộc về phòng nào.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               row:
 *                 type: string
 *               column:
 *                 type: number
 *               room:
 *                 type: string
 *             example:
 *               row: "A"
 *               column: 1
 *               room: "665c412394c78f60a61b4ff1"
 *     responses:
 *       201:
 *         description: Thêm ghế ngồi thành công
 *       400:
 *         description: Ghế ngồi đã tồn tại hoặc phòng chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/seat/add/many:
 *   post:
 *     summary: Thêm nhiều ghế ngồi cùng lúc
 *     tags: [Seat]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, thêm nhiều ghế ngồi vào phòng chiếu.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               row:
 *                 type: string
 *               seatQuantity:
 *                 type: number
 *               room:
 *                 type: string
 *             example:
 *               row: "A"
 *               seatQuantity: 10
 *               room: "665c412394c78f60a61b4ff1"
 *     responses:
 *       201:
 *         description: Thêm ghế ngồi thành công
 *       400:
 *         description: Phòng chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/seat:
 *   get:
 *     summary: Lấy danh sách tất cả ghế ngồi
 *     tags: [Seat]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy danh sách tất cả các ghế ngồi trong hệ thống.
 *
 *       API này sử dụng cơ chế phân trang để trả về danh sách ghế theo từng trang.
 *
 *       Mỗi trang mặc định hiển thị 10 ghế ngồi.
 *
 *       ### Hướng dẫn:
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *       - Ví dụ: `/api/v1/seat?page=2` để lấy danh sách trang 2
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (tùy chọn, mặc định là 1)
 *     responses:
 *       200:
 *         description: Lấy danh sách ghế ngồi thành công
 */

/**
 * @swagger
 * /api/v1/seat/{id}:
 *   get:
 *     summary: Lấy thông tin ghế ngồi theo ID
 *     tags: [Seat]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy chi tiết thông tin của một ghế ngồi dựa trên ID.
 *
 *       ### Hướng dẫn:
 *       Tham số `id` là id của ghế ngồi.
 *       - Ví dụ: `/api/v1/seat/665c412394c78f60a61b4ff1`
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin ghế ngồi thành công
 *       404:
 *         description: Ghế ngồi không tồn tại
 */

/**
 * @swagger
 * /api/v1/seat/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin ghế ngồi
 *     tags: [Seat]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, cập nhật thông tin của một ghế ngồi.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của Ghế ngồi cần cập nhật)
 *       - Ví dụ: `/api/v1/seat/update/665c412394c78f60a61b4ff1`
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               row:
 *                 type: string
 *               column:
 *                 type: number
 *               room:
 *                 type: string
 *             example:
 *               row: "B"
 *               column: 2
 *               room: "665c412394c78f60a61b4ff2"
 *     responses:
 *       200:
 *         description: Cập nhật ghế ngồi thành công
 *       400:
 *         description: Ghế ngồi đã tồn tại hoặc phòng chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 *       404:
 *         description: Ghế ngồi không tồn tại
 */

/**
 * @swagger
 * /api/v1/seat/delete/{id}:
 *   delete:
 *     summary: Xóa ghế ngồi
 *     tags: [Seat]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: xóa một ghế ngồi ra khỏi hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của Ghế ngồi cần xóa)
 *       - Ví dụ: `/api/v1/seat/delete/665c412394c78f60a61b4ff1`
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa ghế ngồi thành công
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 *       404:
 *         description: Ghế ngồi không tồn tại
 */

const routes = new Router();
routes.get("/", controller.getAllSeatController);
routes.get("/:id", controller.getSeatByIdController);
routes.post("/add/", isAdmin, AdminLogger, controller.createSeatController);
routes.post(
	"/add/many",
	isAdmin,
	AdminLogger,
	controller.createManySeatController,
);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteSeatController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateSeatController,
);

export default routes;
