import mongoose from "mongoose";

const { Schema } = mongoose;

const cinemaSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		location: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Cinema", cinemaSchema);
