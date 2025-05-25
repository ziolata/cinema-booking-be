import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		fullname: {
			type: String,
			required: [true, "Thông tin họ và tên là bắt buộc!"],
			trim: true,
			minlength: 3,
			maxlength: 100,
		},
		avatar: { type: String, default: "" },
		email: {
			type: String,
			required: [true, "Thông tin email đăng ký là bắt buộc!"],
			unique: true,
			trim: true,
			lowercase: true,
			match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
		},
		password: {
			type: String,
			required: [true, "Mật khẩu là bắt buộc!"],
		},
		reset_password_token: {
			type: String,
		},
		birthday: {
			type: Date,
			required: [true, "thông tin ngày sinh là bắt buộc"],
		},
		sex: {
			type: String,
			enum: ["male", "female"],
			required: [true, "Thông tin giới tính bắt buộc"],
		},
		phone: {
			type: Number,
			minlength: [10, "Số điện thoại phải từ 10 - 11 chữ số"],
			maxlength: [11, "Số điện thoại tối đa là 11 ký tự"],
			required: [true, "Thông tin số điện thoại là bắt buộc"],
		},
		role: {
			type: Schema.Types.ObjectId,
			ref: "Role",
			require: true,
			default: new mongoose.Types.ObjectId("67e3adb9d53b12ee7b9d9094"),
		},
		isActive: {
			type: String,
			enum: ["activated", "not_activated", "banned"],
			default: "not_activated",
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("User", UserSchema);
