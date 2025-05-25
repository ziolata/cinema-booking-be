import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
	{
		booking_id: {
			type: Schema.Types.ObjectId,
			ref: "Booking",
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		method: {
			type: String,
			required: true,
		},
		card_type: { type: String, required: true },
		bank_code: {
			type: String,
			required: true,
		},
		transaction_ref: { type: String, required: true },
		transaction_no: { type: String, required: true },
		amount: {
			type: Number,
			required: true,
		},
		response_code: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["successfully", "failled"],
			required: true,
		},
		paidAt: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Payment", paymentSchema);
