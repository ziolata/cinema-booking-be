export const addMinutes = (date, minutes) => {
	const d = new Date(date);
	// + phút và cộng thêm 7 tiếng (múi giờ VN)
	return new Date(d.getTime() + minutes * 60000 + 7 * 60 * 60000);
};
