import { NextFunction } from "connect";
import { Request, Response } from "express";
import { ReturnDocument } from "mongodb";
import { db } from "../db";
import env from "../env";
import { User, ObjectId } from "../models";
import { Collections } from "../types";
import { FeedbackType, ErrorType } from "../types/commons";
import { errorHandler } from "../utils";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response: Array<User> = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot get User", ErrorType.GENERAL, res, next);
	}
};

export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne(new ObjectId(<string>req.query.id));

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<User>response));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot get User by ID", ErrorType.GENERAL, res, next);
	}
};

export const getUserWithQuery = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const fieldQuery: string = Object.keys(req.query).toString().toLowerCase();
		const response: Array<User> = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.find({
				[fieldQuery]: <string>req.query[fieldQuery],
			})
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot get User with Query", ErrorType.GENERAL, res, next);
	}
};

export const getUserIDbyUsername = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: req.params.username });

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<User>response._id));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot get User ID by Username", ErrorType.GENERAL, res, next);
	}
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.insertOne(req.body);

		res
			.setHeader("Content-type", "application/json")
			.status(201)
			.end(JSON.stringify(response.insertedId));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot add User", ErrorType.GENERAL, res, next);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) });

		res.setHeader("Content-type", "application/json").status(201).end(JSON.stringify(response.ok));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot delete User", ErrorType.GENERAL, res, next);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOneAndUpdate(
				{ _id: new ObjectId(<string>req.body.id) },
				{ $set: req.body },
				{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
			);

		res
			.setHeader("Content-type", "application/json")
			.status(201)
			.end(JSON.stringify(response.value));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot update User", ErrorType.GENERAL, res, next);
	}
};
