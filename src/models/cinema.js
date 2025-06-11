import mongoose from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

const { Schema } = mongoose;

const cinemaSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		location: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);
cinemaSchema.plugin(mongoosePaginator);

export default mongoose.model("Cinema", cinemaSchema);
