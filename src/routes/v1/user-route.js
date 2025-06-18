import * as controller from "../../controllers/user-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Các API quản lý người dùng
 */

/**
 * @swagger
 * /api/v1/user/update/me:
 *   put:
 *     summary: Cập nhật thông tin cá nhân
 *     description: |
 *       ### Mô tả
 *         Chức năng: Cập nhật thông tin cá nhân của tài khoản có role là user bao gồm: fullname, avatar, email, password, birthday, phone
 *
 *                    + Trường hợp cập nhật email thì sẽ có thư gửi về email cũ để xác nhận đổi email (chỉ cần click vào link để xác nhận cập nhật email)
 *
 *       ### Hướng dẫn
 * 
 *         Chức năng yêu cầu xác thực đăng nhập, nên để chức năng hoạt động thì cần phải nhập token vào cột Authorize trước khi sử dụng.
 *
 *         Truyền đầy đủ thông tin theo định dạng trong **example value**.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *
 *             example:
 *               fullname: Nguyễn Văn A
 *               avatar: base64ImageString
 *               email: newemail@example.com
 *               password: 123456St
 *               birthday: 2000-01-01
 *               phone: "0912345678"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Các lỗi liên quan đến dữ liệu đầu vào
 *       403:
 *         description: Bạn không có quyền thay đổi vai trò
 *       404:
 *         description: Người dùng không tồn tại
 *
 * /api/v1/user/update/{id}:
 *   put:
 *     summary: Admin cập nhật thông tin người dùng
 *     description: |
 *       ### Mô tả:
 *         Đây là chức năng dành cho  Admin: tương tự với chức năng cập nhật dành cho user ở trên nhưng có thêm cấp role cho user khác.
 *
 *         Trường hợp thay đổi email thì sẽ không có thư gửi vào email mà được thay đổi thẳng không cần xác nhận giống update dành cho user
 *
 *         Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs (trong đó có thông tin id của Admin thay đổi và id của user bị đổi thông tin)
 *       
 *       ### Hướng dẫn:
 * 
 *         Chức năng yêu cầu *token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 * 
 *         Truyền ID loại vé vào tham số (Tham số `id` là id của user cần cập nhật thông tin)
 *         - Ví dụ: `/api/v1/user/update/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id của user
 *
 *         Truyền đầy đủ thông tin theo định dạng trong **example value**.
 *
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *               fullname:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *
 *             example:
 *               fullname: Nguyễn Văn A
 *               avatar: base64ImageString
 *               email: newemail@example.com
 *               password: 123456
 *               birthday: 2000-01-01
 *               phone: "0912345678"
 *               role: "60f8b2c8c7e2b421d8f0a123"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Các lỗi liên quan đến dữ liệu đầu vào
 *       403:
 *         description: Bạn không có quyền thay đổi vai trò
 *       404:
 *         description: Người dùng không tồn tại
 *
 * /api/v1/user:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     description: |
 *       ### Mô tả:
 *         Đây là chức năng dành cho tài khoản có quyền Admin: Lấy danh sách và thông của tất cả user (trừ thông tin mật khẩu).
 *
 *         API này sử dụng cơ chế phân trang để trả về danh sách user theo từng trang.
 * 
 *         Mỗi trang mặc định hiển thị thông tin 10 user.

 *        ### Hướng dẫn:
 * 
 *         Chức năng yêu cầu **token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 * 
 *         Tham số query: `page` (tùy chọn) nếu không truyền tham số sẽ mặc định ở page 1,
 *         - Ví dụ: `/api/v1/cinema?page=2` để lấy danh sách trang 2
 * 
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *       403:
 *         description: Không có quyền truy cập
 *
 * /api/v1/user/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     description: |
 *       ### Mô tả:
 *         Đây là chức năng dành cho tài khoản có quyền Admin: Lấy thông tin của một user nào đó (trừ thông tin mật khẩu).
 *
 *        ### Hướng dẫn:
 * 
 *         Chức năng yêu cầu **token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 * 
 *         Truyền ID loại vé vào tham số (Tham số `id` là id của user cần lấy thông tin)
 *         - Ví dụ: `/api/v1/user/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id của user
 *
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin user thành công
 *       404:
 *         description: Người dùng không tồn tại
 *
 * /api/v1/user/delete/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: |
 *       ### Mô tả:
 *         Chức năng của Admin: Xóa một user nào đó khỏi hệ thống.
 *         
 *         Mỗi khi chức năng này được sử dụng sẽ được ghi lại vào AdminLogs.
 * 
 *        ### Hướng dẫn:
 * 
 *         Chức năng yêu cầu **token** của Admin, nên để chức năng hoạt động thì cần phải nhập admin token vào cột Authorize trước khi sử dụng.
 *         
 *         Truyền ID loại vé vào tham số (Tham số `id` là id của user cần xóa)
 *         - Ví dụ: `/api/v1/user/delete/665c412394c78f60a61b4ff1` trong đó "665c412394c78f60a61b4ff1" là id của user
 * 
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       403:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Người dùng không tồn tại
 */

const routes = new Router();
routes.put("/update/me", isAuthenticated, controller.updateUserController);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateUserController,
);
routes.get("/", isAdmin, controller.getAllUserController);
routes.get("/:id", isAdmin, controller.getUserByIdController);
routes.get(
	"/change-email/:token",
	isAuthenticated,
	controller.confirmChangeEmailController,
);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteUserController,
);

export default routes;
