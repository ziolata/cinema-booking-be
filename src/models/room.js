import mongoose from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";
const { Schema } = mongoose;

const roomSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
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
roomSchema.plugin(mongoosePaginator);
export default mongoose.model("Room", roomSchema);
