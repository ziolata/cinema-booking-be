import mongoose from "mongoose";

const { Schema } = mongoose;

const movieSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Thông tin tên phim là bắt buộc!"],
			trim: true,
			minlength: 3,
			maxlength: 100,
		},
		duration: {
			type: Number,
			required: [true, "Thông tin thời gian bộ phim là bắt buộc!"],
		},
		description: {
			type: String,
			required: [true, "Thông tin mô tả bộ phim là bắt buộc!"],
		},
		poster_url: {
			type: String,
			required: [true, "Ảnh poster của bộ phim là bắt buộc!"],
		},
		release_date: {
			type: Date,
			required: [true, "Thông tin ngày phát hành bộ phim là bắt buộc!"],
		},
		genre: {
			type: [Schema.Types.ObjectId],
			ref: "Genre",
			require: [true, "Bộ phim phải có ít nhất 1 thể loại!"],
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Movie", movieSchema);
