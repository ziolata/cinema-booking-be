import mongoose from "mongoose";

const { Schema } = mongoose;

const genreSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			minlength: 3,
			maxlength: 36,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Genre", genreSchema);
