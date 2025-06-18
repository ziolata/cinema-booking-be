import * as controller from "../../controllers/cinema-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: Cinema
 *   description: Các API quản lý rạp chiếu phim
 */

/**
 * @swagger
 * /api/v1/cinema/add:
 *   post:
 *     summary: Thêm mới rạp chiếu phim
 *     tags: [Cinema]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, thêm một rạp chiếu phim mới vào hệ thống
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *
 *        Chức năng yêu cầu **bearer token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 *
 *        Truyền đầy đủ thông tin theo định dạng trong **example value**.
 *
 *        Tên rạp chiếu không được trùng với bất kỳ rạp nào đã tồn tại trong hệ thống.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *             example:
 *               name: CGV Vincom
 *               location: 72 Lê Thánh Tôn, Quận 1, TP.HCM
 *     responses:
 *       200:
 *         description: Thêm rạp chiếu thành công
 *       400:
 *         description: Rạp chiếu đã tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/cinema:
 *   get:
 *     summary: Lấy danh sách tất cả rạp chiếu phim
 *     tags: [Cinema]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy danh sách tất cả các rạp chiếu phim trong hệ thống.
 *
 *       API này sử dụng cơ chế phân trang để trả về danh sách rạp chiếu phim theo từng trang.
 *
 *       Mỗi trang mặc định hiển thị 10 rạp.
 *
 *       ### Hướng dẫn:
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *        - Ví dụ: `/api/v1/cinema?page=2` để lấy danh sách trang 2
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (tùy chọn, mặc định là 1)
 *     responses:
 *       200:
 *         description: Lấy danh sách rạp chiếu thành công
 */

/**
 * @swagger
 * /api/v1/cinema/{id}:
 *   get:
 *     summary: Lấy thông tin rạp chiếu phim theo ID
 *     tags: [Cinema]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy chi tiết thông tin của một rạp chiếu phim dựa trên ID.
 *
 *       ### Hướng dẫn:
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của rạp chiếu cần lấy thông tin)
 *       - Ví dụ: `/api/v1/cinema/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id của rạp chiếu
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin rạp chiếu thành công
 *       404:
 *         description: Rạp chiếu không tồn tại
 */

/**
 * @swagger
 * /api/v1/cinema/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin rạp chiếu phim
 *     tags: [Cinema]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, cập nhật thông tin của một rạp chiếu phim.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *
 *        Chức năng yêu cầu **token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 *
 *        Truyền ID loại vé vào tham số (Tham số `id` là id của rạp chiếu cần cập nhật)
 *        - Ví dụ: `/api/v1/cinema/update/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id của rạp chiếu
 *
 *        Tên rạp chiếu mới cập nhật không được trùng với rạp đã tồn tại.
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
 *               location:
 *                 type: string
 *             example:
 *               name: CGV Landmark 81
 *               location: 720A Điện Biên Phủ, Bình Thạnh, TP.HCM
 *     responses:
 *       200:
 *         description: Cập nhật rạp chiếu thành công
 *       400:
 *         description: Rạp chiếu đã tồn tại
 *       404:
 *         description: Rạp chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/cinema/delete/{id}:
 *   delete:
 *     summary: Xóa rạp chiếu phim
 *     tags: [Cinema]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: xóa một rạp chiếu phim ra khỏi hệ thống
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *
 *       Chức năng yêu cầu **token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của rạp chiếu cần xóa)
 *        - Ví dụ: `/api/v1/cinema/delete/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id của tạp chiếu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa rạp chiếu thành công
 *       404:
 *         description: Rạp chiếu không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

const routes = new Router();
routes.post("/add/", isAdmin, AdminLogger, controller.createCinemaController);
routes.get("/", controller.getAllCinemaController);
routes.get("/:id", controller.getCinemaByIdController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteCinemaController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateCinemaController,
);

export default routes;
