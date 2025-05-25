import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		cinema: {
			type: Schema.Types.ObjectId,
			ref: "Cinema",
			required: true,
		},
		total_seat: {
			type: Number,
		},
		seats: [{ type: Schema.Types.ObjectId, ref: "Seat" }],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Room", roomSchema);
