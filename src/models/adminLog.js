import mongoose from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";
const { Schema } = mongoose;

const adminLogSchema = new Schema(
	{
		admin_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin",
			required: true,
		},
		action: { type: String, required: true },
		target: { type: String, required: true },
		target_id: { type: mongoose.Schema.Types.ObjectId },
		description: { type: String },
		ip_address: { type: String },
	},
	{
		timestamps: true,
	},
);

adminLogSchema.plugin(mongoosePaginator);

export const AdminLog = mongoose.model("AdminLog", adminLogSchema);
