import mongoose from "mongoose";

const { Schema } = mongoose;

const showtimeSchema = new Schema(
	{
		movie_id: {
			type: Schema.Types.ObjectId,
			ref: "Movie",
			required: true,
		},
		room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
		start_time: {
			type: Date,
			required: true,
		},
		end_time: {
			type: Date,
			required: true,
		},
		available_seats: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Showtime", showtimeSchema);
