import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Role", roleSchema);
