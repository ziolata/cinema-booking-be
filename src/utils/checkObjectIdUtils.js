import mongoose from "mongoose";
import { throwError } from "./response.js";

export const checkObjectId = (data) => {
	if (!mongoose.Types.ObjectId.isValid(data)) {
		throwError(404, "ID không hợp lệ!");
	}
};
