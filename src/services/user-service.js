import token from "../models/token.js";
import user from "../models/user.js";
import { signToken, verifyToken } from "../utils/authUtils.js";
import { checkObjectId } from "../utils/checkObjectIdUtils.js";
import { successResponse, throwError } from "../utils/response.js";
import { uploadImage } from "./cloud/cloudinary-service.js";
import { sendChangeEmail } from "./email-service.js";

const getUserOrThrowById = async (id) => {
	checkObjectId(id);
	// Lấy thông tin user filter theo id và loại bỏ trường password khỏi dữ liệu trả về
	const foundUser = await user.findById(id).select("-password");
	if (!foundUser) {
		throwError(404, "Người dùng không tồn tại!");
	}
	return foundUser;
};

export const getAllUser = async (page = 1, limit = 10) => {
	const docsToItems = {
		docs: "items",
	};
	const options = {
		page,
		limit,
		select: "-password", // Loại bỏ password khỏi dữ liệu trả về
		customLabels: docsToItems,
	};
	const foundUser = await user.paginate(null, options);
	return successResponse("Lấy danh sách người dùng thành công!", foundUser);
};

export const getUserById = async (id) => {
	const foundUser = await getUserOrThrowById(id);
	return successResponse(
		`Lấy thông tin của user có id: ${id} thành công!`,
		foundUser,
	);
};

export const updateUser = async (user_id, role_name, data) => {
	if (data.role && role_name !== "admin") {
		throwError(403, "Bạn không có quyền thay đổi vai trò!");
	}
	let updateData = data;
	const foundUser = await getUserOrThrowById(user_id);
	if (data.avatar) {
		const avatar = await uploadImage(
			data.avatar,
			`avatar_${foundUser._id}`,
			"cinemaUser",
		);
		data.avatar = avatar;
	}
	// Kiểm tra có cập nhật email và trùng với email hiện tại của tài khoản đó
	if (data.email && data.email === foundUser.email) {
		throwError(400, "Không thể cập nhật email trùng với email hiện tại!");
	}

	// Kiểm tra user có cập nhật email và khác với email của tài khoản hiện tại
	if (data.email && data.email !== foundUser.email && role_name === "user") {
		const now = Math.floor(Date.now() / 1000);
		const emailExisted = await user.findOne({ email: data.email });
		if (emailExisted) {
			throwError(400, "Email đã tồn tại trong hệ thống không thể cập nhật!");
		}
		const existingToken = await token.findOne({
			user_id,
			type: "change_email",
			used: "unused", // kiểm tra token đã sử dụng hay chưa
			expiresAt: { $gt: now }, // Token vẫn còn hiệu lực
		});
		if (existingToken) {
			const remainingSeconds = existingToken.expiresAt - now;
			throwError(
				400,
				`Yêu cầu cập nhật email trước đây vẫn còn hiệu lực vui lòng kiểm tra lại email hoặc gửi lại sau ${remainingSeconds} giây`,
			);
		}
		await token.updateMany(
			{ user_id: user_id, type: "change_email", used: "unused" },
			{ used: "expired" },
		);
		// Tạo token dựa trên thông tin tại khoản đang đăng nhập
		const createdToken = signToken(foundUser, "15m");
		// decode để lấy thông tin hạn của token (exp)
		const decodedToken = verifyToken(createdToken);
		await token.create({
			user_id,
			token: createdToken,
			type: "change_email",
			expiresAt: decodedToken.exp,
			targetEmail: data.email,
		});
		const link = `${process.env.LINK}/api/v1/user/change-email/${createdToken}`;
		await sendChangeEmail(foundUser.email, link);
		// Loại bỏ email khỏi data
		const { email, ...rest } = data;
		updateData = rest;
		return successResponse(
			"Yêu cầu đổi email đã được gửi vào email hiện tại của bạn, vui long xác nhận nếu thay đổi thông tin email!",
		);
	}

	await user.updateOne({ _id: user_id }, updateData);
	return successResponse("Cập nhật thành công!");
};

export const confirmChangeEmail = async (tokenParam) => {
	try {
		// Decode token được lấy từ params
		const decodedToken = verifyToken(tokenParam);
		const tokenDoc = await token.findOne({ token: tokenParam });
		if (!tokenDoc) {
			throwError(404, "Đường dẫn không tồn tại!");
		}
		if (tokenDoc.used !== "unused") {
			await token.updateOne({ token: tokenParam }, { used: "used" });
			throwError(400, "Đường dẫn đã được sử dụng!");
		}
		if (tokenDoc.type !== "change_email") {
			throwError(400, "Đường dẫn này không dành cho cập nhật email!");
		}
		await token.updateOne({ token: tokenParam }, { used: "used" });
		await user.updateOne(
			{ _id: decodedToken._id },
			{ email: tokenDoc.targetEmail },
		);
		return successResponse("Cập nhật email thành công!");
	} catch (error) {
		// Nếu token đổi email hết hạn thì đánh dấu expired
		if (error.name === "TokenExpiredError") {
			await token.updateOne({ token: tokenParam }, { used: "expired" });
		}
		throw error;
	}
};

export const deleteUser = async (id) => {
	await getUserOrThrowById(id);
	await user.deleteOne({ _id: id });
	return successResponse("Xóa thành công!");
};
