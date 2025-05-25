import mongoose from "mongoose";

const { Schema } = mongoose;
const ticket_typeSchema = new Schema(
	{
		showtime: { type: Schema.Types.ObjectId, ref: "Showtime" },
		movie_type: { type: String, enum: ["2D", "3D", "IMAX"], required: true },
		time_slot: { type: String, enum: ["morning", "afternoon", "evening"] },
		day_type: { type: String, enum: ["weekday", "weekend", "holiday"] },
		type: { type: String, enum: ["adult", "child", "combo"] },
		price: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("TicketType", ticket_typeSchema);
