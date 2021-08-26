import bcrypt from "bcryptjs";
import { Request } from "express";
import { fn } from "../db";
import { User } from "../models";

export const passwordHash = async (input: string): Promise<string> => {
	return await bcrypt.hash(input, await bcrypt.genSalt(10));
};

export const passwordCompare = async (input: string, password: string): Promise<boolean> => {
	return await bcrypt.compare(input, password);
};

export const userExistsAndPasswordIsTrue = async (req: Request) => {
	const { username, password } = req.body as Pick<User, "username" | "password">;
	const response = (await fn.dbFindOne({ username: username }, req.body)) as unknown as User;
	return response && (await passwordCompare(password, response.password));
};

export const passwordHasher = async (req: Request): Promise<User> => {
	const { password }: Pick<User, "password"> = req.body;
	req.body.password = await bcrypt.hash(password as keyof User, await bcrypt.genSalt(10));
	return req.body as User;
};
