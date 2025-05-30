import crypto from "crypto";
import { format, parse } from "date-fns";
import booking from "../../models/booking.js";
import payment from "../../models/payment.js";
import user from "../../models/user.js";
import { throwError, successResponse } from "../../utils/response.js";
import { sendTicket } from "../email-service.js";
import {
	handleSuccessfulPayment,
	verifyVnpaySignature,
} from "../../utils/vnpay.js";

export const vnpConfig = {
	vnp_TmnCode: process.env.vnp_TmnCode,
	vnp_HashSecret: process.env.vnp_HashSecret,
	vnp_Url: process.env.vnp_Url,
	vnp_ReturnUrl: process.env.vnp_ReturnUrl,
};

export const createPayment = async (data) => {
	const foundBooking = await booking.findById(data.booking_id);
	const vnp_TmnCode = vnpConfig.vnp_TmnCode;
	const vnp_HashSecret = vnpConfig.vnp_HashSecret;
	const vnp_Url = vnpConfig.vnp_Url;
	const vnp_ReturnUrl = vnpConfig.vnp_ReturnUrl;
	const date = new Date();
	const createDate = format(date, "yyyyMMddHHmmss");
	const vnp_TxnRef = format(date, "HHmmss");
	const orderInfo = `Thanh toan don hang ${data.booking_id}`;
	const orderType = "billpayment";
	const locale = "vn";
	const currCode = "VND";
	const ipAddr = data.ip;
	const params = {
		vnp_Amount: foundBooking.price * 100,

		vnp_Command: "pay",
		vnp_CreateDate: createDate,
		vnp_CurrCode: currCode,
		vnp_IpAddr: data.ip,
		vnp_Locale: locale,
		vnp_OrderInfo: orderInfo,
		vnp_OrderType: orderType,
		vnp_ReturnUrl: vnp_ReturnUrl,
		vnp_TmnCode: vnp_TmnCode,
		vnp_TxnRef: vnp_TxnRef,
		vnp_Version: "2.1.0",
	};

	const sortedParams = new URLSearchParams(params).toString();
	const signData = crypto
		.createHmac("sha512", vnp_HashSecret)
		.update(sortedParams)
		.digest("hex");

	// Tạo URL thanh toán
	const paymentUrl = `${vnp_Url}?${sortedParams}&vnp_SecureHash=${signData}`;
	return { paymentUrl };
};

export const getPayment = async (data) => {
	const vnp_Params = data;
	const signature = verifyVnpaySignature(vnp_Params, vnpConfig);
	if (!signature) {
		throwError(400, "Chữ ký sai!");
	}
	const bookingId = vnp_Params.vnp_OrderInfo.split(" ").pop();
	const foundBooking = await booking
		.findById(bookingId)
		.populate("ticket_type");

	const foundUSer = await user.findById(foundBooking.user_id);
	const ticket_codes = [];
	const payDate = parse(vnp_Params.vnp_PayDate, "yyyyMMddHHmmss", new Date());
	const foundPayment = await payment.findOne({
		booking_id: bookingId,
		status: "successfully",
	});
	if (foundPayment) {
		throwError(400, "Giao dịch đã thực hiện!");
	}

	if (vnp_Params.vnp_ResponseCode === "00") {
		const response = await handleSuccessfulPayment(
			bookingId,
			vnp_Params,
			payDate,
			foundBooking,
			ticket_codes,
		);
		await sendTicket(foundUSer.email, ticket_codes);
		return successResponse("Thanh toán thành công!", response);
	}
	await payment.create({
		booking_id: bookingId,
		user_id: foundBooking.user_id,
		method: "vnpay",
		amount: vnp_Params.vnp_Amount / 100,
		bank_code: vnp_Params.vnp_BankCode,
		transaction_ref: vnp_Params.vnp_TransactionNo,
		transaction_no: vnp_Params.vnp_TxnRef,
		response_code: vnp_Params.vnp_ResponseCode,
		status: "failled",
		paidAt: payDate,
	});
	throwError(400, "Thanh toán không thành công!");
};

