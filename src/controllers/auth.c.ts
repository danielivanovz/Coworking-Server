import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";
import { User } from "../models";
import { Document, InsertOneResult } from "mongodb";
import { createToken } from "../utils/tokenManager";
import { passwordCompare, passwordHash } from "../utils/passwordManager";
import * as boom from "@hapi/boom";
import { errorHandler } from "../utils";
import { ErrorType, FeedbackType } from "../types/commons";

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("here");
		const data: User = req.body;
		const response: Document = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: data.username });

		if (response && (await passwordCompare(data.password, response.password))) {
			errorHandler(FeedbackType.SUCCESS, 200, "Correct Password", null, res, next);
			const token = await createToken(data.username);
			if(token){
				res.status(201).send({ id: response.insertedId, token: token });
			}
			else {
				errorHandler(FeedbackType.FAILURE, 400,"Token not created",ErrorType.AUTH, res, next);
			}
			
		} else {
			errorHandler(FeedbackType.FAILURE, 400,"Invalid Credentials.",ErrorType.AUTH, res, next);
		}
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400,"Login Failed.",ErrorType.AUTH, res, next);
	}
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data: User = req.body;

		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ email: data.email });

		if (response) {
			errorHandler(FeedbackType.FAILURE, 409,"User Already Exist. Please Login.",ErrorType.AUTH, res, next);
		} else {
			data.password = await passwordHash(data.password);
			const response: InsertOneResult<Document> = await db
				.collection(env.getCollection(Collections.USERS_COLLECTION))
				.insertOne(data);

			const token = await createToken(data.username);
			if (token) {
				res.status(201).send({ id: response.insertedId, token: token });
			} else {
				errorHandler(FeedbackType.FAILURE, 400,"Token not created",ErrorType.AUTH, res, next);
			}
		}
	} catch (error) {
		log.error(error);
	}
};
