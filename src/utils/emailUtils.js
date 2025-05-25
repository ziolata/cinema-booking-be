import {
	sendActivateEmail,
	sendResetEmail,
} from "../services/email-service.js";

export const sendEmail = async (email, type, token) => {
	const link = `${process.env.LINK}/api/v1/auth/${type}/${token}`;
	if (type === "reset") {
		await sendResetEmail(email, link);
	}
	if (type === "activate") {
		await sendActivateEmail(email, link);
	}
};
