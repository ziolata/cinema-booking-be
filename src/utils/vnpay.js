import booking from "../models/booking.js";
import payment from "../models/payment.js";
import crypto from "crypto";
const generateUniqueTicketCode = async () => {
	let unique = false;
	let ticketCode = "";

	while (!unique) {
		ticketCode = crypto.randomBytes(4).toString("hex").toUpperCase();
		const existing = await booking.findOne({ ticket_code: ticketCode });
		if (!existing) {
			unique = true;
		}
	}

	return ticketCode;
};

export const generateSignature = (
	params,
	secret = vnpConfig.vnp_HashSecret,
) => {
	const sortedParams = new URLSearchParams(params).toString();
	return crypto.createHmac("sha512", secret).update(sortedParams).digest("hex");
};
export const verifyVnpaySignature = (vnp_Params, vnpConfig) => {
	const secureHash = vnp_Params.vnp_SecureHash;
	delete vnp_Params.vnp_SecureHash;
	delete vnp_Params.vnp_SecureHashType;

	const sortedParams = new URLSearchParams(vnp_Params).toString();
	const calculatedHash = crypto
		.createHmac("sha512", vnpConfig.vnp_HashSecret)
		.update(sortedParams)
		.digest("hex");

	return calculatedHash === secureHash;
};
export const handleSuccessfulPayment = async (
	booking_id,
	vnp_Params,
	payDate,
	foundBooking,
	ticket_codes = [],
) => {
	const response = await payment.create({
		booking_id: booking_id,
		user_id: foundBooking.user_id,
		method: "vnpay",
		amount: vnp_Params.vnp_Amount / 100,
		card_type: vnp_Params.vnp_CardType,
		bank_code: vnp_Params.vnp_BankCode,
		transaction_ref: vnp_Params.vnp_TransactionNo,
		transaction_no: vnp_Params.vnp_TxnRef,
		response_code: vnp_Params.vnp_ResponseCode,
		status: "successfully",
		paidAt: payDate,
	});

	await booking.updateOne(
		{ _id: booking_id },
		{
			status: "paid",
		},
	);
	for (const seat of foundBooking.seats) {
		const randomCode = await generateUniqueTicketCode();

		const createTicket = await ticket.create({
			booking_id: booking_id,
			ticket_type: foundBooking.ticket_type,
			seat: seat,
			ticket_code: `TTK-${randomCode}`,
			price: foundBooking.ticket_type.price,
		});
		ticket_codes.push(createTicket.ticket_code);
	}
	return response;
};
export const handleFailledfulPayment = async (
	booking_id,
	vnp_Params,
	payDate,
) => {
	await payment.create({
		booking_id: booking_id,
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
