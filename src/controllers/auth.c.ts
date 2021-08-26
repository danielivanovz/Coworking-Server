import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { env } from "../config";
import log from "../logger";
import { Collections } from "../types";
import { User } from "../models";
import { Document, InsertOneResult } from "mongodb";
import { createToken } from "../utils/tokenManager";
import { passwordCompare, passwordHash } from "../utils/passwordManager";
import { feedbackHandler } from "../utils";
import { ErrorType, FeedbackType } from "../types/commons";

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password, email }: Pick<User, "username" | "password" | "email"> = req.body;
		const response = (await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: username })) as User;

		if (response && (await passwordCompare(password, response.password))) {
			const token = await createToken(username);

			if (token) {
				res.status(201).send({ id: response._id, token: token });
			} else {
				feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, "Token not created");
			}
		} else {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, "Invalid Credentials");
		}
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, "Login Failed");
	}
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password, email }: Pick<User, "username" | "password" | "email"> = req.body;

		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ email: email });

		if (response) {
			feedbackHandler(
				FeedbackType.FAILURE,
				409,
				ErrorType.AUTH,
				res,
				next,
				"User Already Exist. Please Login"
			);
		} else {
			const user: User = req.body;
			user.password = await passwordHash(password);
			const response: InsertOneResult<Document> = await db
				.collection(env.getCollection(Collections.USERS_COLLECTION))
				.insertOne(user);

			const token = await createToken(username);
			if (token) {
				res.status(201).send({ id: response.insertedId, token: token });
			} else {
				feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, "Token not created");
			}
		}
	} catch (error) {
		log.error(error);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.clearCookie("token").status(200).send({ message: "Successfully logged out" });
	} catch (error) {}
};
