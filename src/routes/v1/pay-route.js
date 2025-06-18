import * as controller from "../../controllers/pay-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Các API quản lý thanh toán
 */

/**
 * @swagger
 * /api/v1/pay/create_payment:
 *   post:
 *     summary: Thanh toán đơn hàng
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ### Mô tả:
 *       Chức năng thanh toán đơn booking
 *
 *       Được Tích hợp với VNPAY
 *       ### Hướng dẫn:
 *
 *        Chức năng yêu cầu xác thực đăng nhập, nên để chức năng hoạt động thì cần phải nhập token vào cột Authorize trước khi sử dụng.
 *
 *        Truyền đầy đủ thông tin theo định dạng trong **example value**.
 *
 *        Thẻ test:
 *         - Ngân hàng: NCB
 *         - Số thẻ: 9704198526191432198
 *         - Tên chủ thẻ:NGUYEN VAN A
 *         - Ngày phát hành:07/15
 *         - Mật khẩu OTP:123456
 *
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking_id:
 *                 type: string
 *
 *             example:
 *               booking_id: "682bfe66510a76ded8bea18e"
 *     responses:
 *       200:
 *         description: Thêm rạp chiếu thành công
 *       400:
 *         description: Rạp chiếu đã tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

const routes = new Router();

routes.post(
	"/create_payment",
	isAuthenticated,
	controller.createPaymentController,
);
routes.get("/vnpay_return", controller.getPaymentController);

export default routes;
