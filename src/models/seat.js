import mongoose from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";
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
			unique: true,
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
seatSchema.plugin(mongoosePaginator);
export default mongoose.model("Seat", seatSchema);
