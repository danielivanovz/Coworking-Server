import { Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import { Collections } from "../types";
import { ObjectId, ReturnDocument } from "mongodb";
import { Space } from "../models";
import { FeedbackType, ErrorType } from "../types/commons";
import { errorHandler } from "../utils";
import { NextFunction } from "connect";

export const getSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response: Array<Space> = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot get Space", ErrorType.GENERAL, res, next);
	}
};

export const getSpaceByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOne(new ObjectId(<string>req.query.id));

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<Space>response));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot get Space by ID", ErrorType.GENERAL, res, next);
	}
};

export const addSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.insertOne(req.body);

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(response.insertedId));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot add Space", ErrorType.GENERAL, res, next);
	}
};

export const deleteSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) });

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response.ok));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot delete Space", ErrorType.GENERAL, res, next);
	}
};

export const updateSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOneAndUpdate(
				{ _id: new ObjectId(<string>req.body.id) },
				{ $set: req.body },
				{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
			);

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response.ok));
	} catch (error) {
		errorHandler(FeedbackType.FAILURE, 400, "Cannot update Space", ErrorType.GENERAL, res, next);
	}
};
