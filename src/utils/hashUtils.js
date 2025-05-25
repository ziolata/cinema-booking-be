import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

export const comparePassword = async (password, hash) => {
	const compare = await bcrypt.compare(password, hash);
	return compare;
};
