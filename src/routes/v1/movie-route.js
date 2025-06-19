import * as controller from "../../controllers/movie-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Các API quản lý phim
 */

/**
 * @swagger
 * /api/v1/movie/add:
 *   post:
 *     summary: Thêm mới bộ phim
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, thêm một bộ phim mới vào hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Gửi dữ liệu dưới dạng `multipart/form-data`.
 *
 *       Trường `poster_url` phải là file ảnh.
 *
 *       Tên bộ phim không được trùng với phim đã có trong hệ thống.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               poster_url:
 *                 type: string
 *                 format: binary
 *               release_date:
 *                 type: string
 *                 format: date
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               title: "Avengers: Endgame"
 *               duration: 180
 *               description: Bộ phim bom tấn về cuộc chiến cuối cùng chống lại Thanos.
 *               release_date: 2024-06-15
 *               genre:
 *                 - 665c412394c78f60a61b4ff1
 *                 - 665c412394c78f60a61b4ff2
 *     responses:
 *       201:
 *         description: Thêm bộ phim thành công
 *       400:
 *         description: Bộ phim đã tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/movie:
 *   get:
 *     summary: Lấy danh sách tất cả phim
 *     tags: [Movie]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy danh sách tất cả các bộ phim trong hệ thống.
 *
 *       API này sử dụng cơ chế phân trang để trả về danh sách phim theo từng trang.
 *
 *       Mỗi trang mặc định hiển thị 10 phim.
 *
 *       ### Hướng dẫn:
 *       Sử dụng tham số query `page` để chọn trang (mặc định là 1 nếu không truyền).
 *       - Ví dụ: `/api/v1/movie?page=2` để lấy danh sách trang 2
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (tùy chọn, mặc định là 1)
 *     responses:
 *       200:
 *         description: Lấy danh sách phim thành công
 */

/**
 * @swagger
 * /api/v1/movie/{id}:
 *   get:
 *     summary: Lấy thông tin bộ phim theo ID
 *     tags: [Movie]
 *     description: |
 *       ### Mô tả:
 *       Chức năng lấy chi tiết thông tin của một bộ phim dựa trên ID.
 *
 *       ### Hướng dẫn:
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của bộ phim cần lấy thông tin)
 *       - Ví dụ: `/api/v1/movie/665c412394c78f60a61b4ff1`, "665c412394c78f60a61b4ff1" là id của bộ phim
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin bộ phim thành công
 *       404:
 *         description: Bộ phim không tồn tại
 */

/**
 * @swagger
 * /api/v1/movie/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin bộ phim
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin, cập nhật thông tin của một bộ phim.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Gửi dữ liệu dưới dạng `multipart/form-data`.
 *
 *       Trường `poster_url` là tùy chọn, nếu muốn cập nhật ảnh mới thì truyền file ảnh.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của bộ phim cần cập nhật)
 *        - Ví dụ: `/api/v1/movie/665c412394c78f60a61b4ff1`,"665c412394c78f60a61b4ff1" là id của bộ phim
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               poster_url:
 *                 type: string
 *                 format: binary
 *               release_date:
 *                 type: string
 *                 format: date
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               title:"Avengers: Infinity War"
 *               duration: 150
 *               description: Phần tiếp theo của cuộc chiến chống Thanos.
 *               release_date: 2024-07-01
 *               genre:
 *                 - 665c412394c78f60a61b4ff3
 *                 - 665c412394c78f60a61b4ff4
 *     responses:
 *       200:
 *         description: Cập nhật bộ phim thành công
 *       400:
 *         description: Bộ phim đã tồn tại
 *       404:
 *         description: Bộ phim không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/movie/delete/{id}:
 *   delete:
 *     summary: Xóa bộ phim
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng của Admin: xóa một bộ phim ra khỏi hệ thống.
 *
 *       Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 *
 *       ### Hướng dẫn:
 *       Chức năng yêu cầu **token** của Admin. Vui lòng nhập token vào nút "Authorize" trước khi sử dụng API.
 *
 *       Truyền ID loại vé vào tham số (Tham số `id` là id của bộ phim cần  xóa)
 *       - Ví dụ: `/api/v1/movie/delete/665c412394c78f60a61b4ff1` trong đó 665c412394c78f60a61b4ff1 là id của bộ phim
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa bộ phim thành công
 *       404:
 *         description: Bộ phim không tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

const routes = new Router();
routes.post("/add/", isAdmin, AdminLogger, controller.createMovieController);
routes.get("/", controller.getAllMovieController);
routes.get("/:id", controller.getMovieByIdController);
routes.delete(
	"/delete/:id",
	AdminLogger,
	isAdmin,
	controller.deleteMovieController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateMovieController,
);

export default routes;
