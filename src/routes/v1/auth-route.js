import * as controller from "../../controllers/auth-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Các API xác thực và quản lý tài khoản
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     description: |
 *       ### Mô tả:
 *         Chức năng đăng ký tài khoản, tạo một tài khoản trên hệ thống.
 *       ### Hướng dẫn
 *         Truyền đầy đủ thông tin để đăng ký tài khoản theo định dạng trong **example value**.
 *
 *         Số điện thoại phải đúng định dạng 10-11 số.
 *
 *         Hệ thống sẽ gửi email kích hoạt tài khoản, vui lòng kiểm tra email sau khi đăng ký có thể ấn trực tiếp vào đường link để kích hoạt hoặc coppy token sau api/v1/auth/active/ và dán vào trong swagger kích hoạt tài khoản.
 *
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               sex:
 *                 enum:
 *                   - male
 *                   - female
 *                 example: male
 *               phone:
 *                 type: string
 *                 pattern: "^[0-9]{10,11}$"
 *                 example: 0769582213
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đăng ký đã tồn tại!
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     description: |
 *       ### Mô tả
 *         Chức năng đăng nhập, sau khi đăng nhập sẽ trả về access_token, để nhập vào cột Authorize với mục đích sử dụng các chức năng yêu cầu đăng nhập hoặc chức năng yêu cầu Quyền Admin
 *       ### Hướng dẫn
 *         Truyền đầy đủ thông tin theo định dạng trong **example value**.
 *
 *         Sau khi đăng nhập thành công có thể lấy access_token nhập vào Authorize để có thể sử dụng các chức năng yêu cầu đăng nhập
 *
 *
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai mật khẩu!
 *       404:
 *         description: Email đăng nhập không tồn tại!
 */

/**
 * @swagger
 * /api/v1/auth/forgot:
 *   post:
 *     summary: Yêu cầu đặt lại mật khẩu
 *     description: |
 *       ### Mô tả
 *         Chức năng đặt lại mật khẩu, mục đích sử dụng khi user quên mật khẩu tài khoản của bản thân.
 *
 *         Sau khi gửi yêu cầu đặt lại mật khẩu thành công, hệ thống sé gửi một email xác nhận đặt lại mật khẩu
 *       ### Hướng dẫn
 *         Nhập email đã đăng ký muốn lấy lại mật khẩu
 *
 *         Sau khi yêu cầu thành công, vào email và click vào link để xác nhận đặt lại mật khẩu.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gửi email đặt lại mật khẩu thành công
 *       404:
 *         description: Email không tồn tại!
 */

/**
 * @swagger
 * /api/v1/auth/reset/{token}:
 *   post:
 *     summary: Đặt lại mật khẩu qua email
 *     description: |
 *       ### Mô tả
 *           Chức năng đặt lại mật khẩu, cập nhật lại mật khẩu của người dùng.
 *       ### Hướng dẫn
 *           Nhập Token được gửi trong email yêu cầu đặt lại trước đó và truyền thông tin password mới muốn đặt.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       404:
 *         description: Đường dẫn không tồn tại!
 *       400:
 *         description: |
 *           Có thể gặp các lỗi sau:
 *
 *           - Tài khoản đã được kích hoạt!
 *           - Đường dẫn đã được sử dụng!
 *           - Đường dẫn này không dành cho tác vụ đặt lại mật khẩu!
 */

/**
 * @swagger
 * /api/v1/auth/change:
 *   post:
 *     summary: Đổi mật khẩu khi đã đăng nhập
 *     description: |
 *       ### Mô tả
 *           Chức năng đổi mật khẩu, cập nhật lại mật khẩu hiện tại bằng một mật khẩu mới
 *       ### Hướng dẫn
 *           Đầu tiên đảm bảo đã nhập access_token (khi login) và nhập vào Authorize
 *
 *           Truyền đầy đủ thông tin theo định dạng trong **example value**,Password là mật khẩu hiện tại, newpassword là mật khẩu mới muốn đổi, reNewpassword xác nhận lại mật khẩu mới.
 *
 *
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newpassword:
 *                 type: string
 *               reNewPassword:
 *                 type: string
 *     responses:
 *       404:
 *          description: Email không tồn tại!
 *       200:
 *         description: Đổi mật khẩu thành công
 */

const routes = new Router();
routes.post("/register", controller.registerController);
routes.post("/login", controller.loginController);
routes.get("/activate/:token", controller.activateController);
routes.post("/forgot/", controller.forgotPasswordController);
routes.post("/reset/:token", controller.resetPasswordController);
routes.post("/change", isAuthenticated, controller.changePassword);
export default routes;
