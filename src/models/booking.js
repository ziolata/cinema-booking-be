import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		showtime: {
			type: Schema.Types.ObjectId,
			ref: "Showtime",
			required: true,
		},
		ticket_type: {
			type: Schema.Types.ObjectId,
			ref: "TicketType",
			required: true,
		},
		seats: { type: [Schema.Types.ObjectId], ref: "Seat", required: true },
		price: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["unpaid", "paid"],
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Booking", bookingSchema);
