import * as controller from "../../controllers/genre-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: Các API quản lý thể loại phim
 */

/**
 * @swagger
 * /api/v1/genre/add:
 *   post:
 *     summary: Thêm mới thể loại phim
 *     tags: [Genre]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, thêm một thể loại phim mới vào hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **bearer token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền đầy đủ thông tin theo định dạng trong **example value**.
 *
 *       Tên thể loại phim không được trùng với thể loại đã có trong hệ thống.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Hành động
 *     responses:
 *       201:
 *         description: Thêm thể loại thành công
 *       400:
 *         description: Thể loại phim đã tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/genre:
 *   get:
 *     summary: Lấy danh sách tất cả thể loại phim
 *     tags: [Genre]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy danh sách tất cả các thể loại phim hiện có trong hệ thống.
 *
 *       API này không yêu cầu đăng nhập.
 *
 *     responses:
 *       200:
 *         description: Lấy danh sách thể loại thành công
 */

/**
 * @swagger
 * /api/v1/genre/{id}:
 *   get:
 *     summary: Lấy thông tin thể loại phim theo ID
 *     tags: [Genre]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy chi tiết thông tin của một thể loại phim dựa trên ID.
 *
 *       ### Hướng dẫn:
 *       Tham số `id` là id của thể loại phim.
 *        - Ví dụ: `/api/v1/genre/665c412394c78f60a61b4ff1`
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin thể loại thành công
 *       404:
 *         description: Thể loại phim không tồn tại
 */

/**
 * @swagger
 * /api/v1/genre/update/{id}:
 *   put:
 *     summary: Cập nhật thể loại phim
 *     tags: [Genre]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, cập nhật thông tin của một thể loại phim.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **bearer token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của thể loại cần cập nhật)
 *        - Ví dụ: `/api/v1/genre/update/665c412394c78f60a61b4ff1` trong đó 665c412394c78f60a61b4ff1 là id của thể loại
 *
 *       Tên thể loại mới không được trùng với thể loại đã có trong hệ thống.
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
 *             example:
 *               name: Kinh dị
 *     responses:
 *       200:
 *         description: Cập nhật thể loại thành công
 *       400:
 *         description: Thể loại phim đã tồn tại
 *       404:
 *         description: Thể loại phim không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/genre/delete/{id}:
 *   delete:
 *     summary: Xóa thể loại phim
 *     tags: [Genre]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: xóa một thể loại phim ra khỏi hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của thể loại cần xóa)
 *         - Ví dụ: `/api/v1/genre/delete/665c412394c78f60a61b4ff1`
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thể loại thành công
 *       404:
 *         description: Thể loại phim không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

const routes = new Router();
routes.post("/add/", isAdmin, AdminLogger, controller.createGenreController);
routes.get("/", controller.getAllGenreController);
routes.get("/:id", controller.getGenreByIdController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteGenreController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateGenreController,
);

export default routes;
