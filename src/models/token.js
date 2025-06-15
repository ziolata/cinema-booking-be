import mongoose from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";
const { Schema } = mongoose;
const tokenSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
		token: { type: String, required: true },
		type: {
			type: String,
			required: true,
			enum: ["change_email", "reset_password", "verify_account"],
		},
		expiresAt: { type: String, required: true, unique: true },
		used: {
			type: String,
			enum: ["unused", "used", "expired"],
			default: "unused",
		},
		targetEmail: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true },
);
tokenSchema.plugin(mongoosePaginator);

export default mongoose.model("Token", tokenSchema);
