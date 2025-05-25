import mongoose from "mongoose";

const { Schema } = mongoose;

const seatSchema = new Schema(
	{
		seat_number: {
			type: String,
			required: true,
		},
		row: {
			type: String,
			required: true,
		},
		column: {
			type: String,
			required: true,
		},
		room: {
			type: Schema.Types.ObjectId,
			ref: "Room",
			required: true,
		},
		status: {
			type: String,
			enum: ["available", "reserved", "booked"],
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Seat", seatSchema);
