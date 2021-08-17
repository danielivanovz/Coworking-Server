import bcrypt from "bcryptjs";

export const passwordHash = async (input: string): Promise<string> => {
	return await bcrypt.hash(input, await bcrypt.genSalt(10));
};

export const passwordCompare = async (input: string, password: string): Promise<boolean> => {
	return await bcrypt.compare(input, password);
};
