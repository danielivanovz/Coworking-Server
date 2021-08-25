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
		const data: User = req.body;
		const response: Document = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: data.username });

		if (response && (await passwordCompare(data.password, response.password))) {
			const token = await createToken(data.username);

			if (token) {
				res.status(201).send({ id: response.insertedId, token: token });
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
		const data: User = req.body;

		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ email: data.email });

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
			data.password = await passwordHash(data.password);
			const response: InsertOneResult<Document> = await db
				.collection(env.getCollection(Collections.USERS_COLLECTION))
				.insertOne(data);

			const token = await createToken(data.username);
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
