import mongoose from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";
const { Schema } = mongoose;
const TicketSchema = new Schema(
	{
		booking_id: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
		ticket_type: {
			type: Schema.Types.ObjectId,
			ref: "TicketType",
			required: true,
		},
		seat: { type: Schema.Types.ObjectId, ref: "Seat", required: true },
		ticket_code: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true },
);
TicketSchema.plugin(mongoosePaginator);

export default mongoose.model("Ticket", TicketSchema);
