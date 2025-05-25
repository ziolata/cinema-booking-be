import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

export const uploadImage = async (filePath, name, folder) => {
	const result = await cloudinary.uploader.upload(filePath, {
		folder: folder,
		public_id: name,
	});

	return result.secure_url;
};
