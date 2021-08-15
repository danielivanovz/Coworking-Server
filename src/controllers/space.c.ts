import { Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";
import { ObjectId, ReturnDocument } from "mongodb";
import { Space } from "../models";

export const getSpace = async (req: Request, res: Response) => {
	try {
		const response: Array<Space> = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
};

export const getSpaceByID = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOne(new ObjectId(<string>req.query.id));

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<Space>response));
	} catch (error) {
		log.error("Error finding object by ID", error);
	}
};

export const addSpace = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.insertOne(req.body);

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(response.insertedId));
	} catch (error) {
		log.error("Error creating new space");
	}
};

export const deleteSpace = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) });

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response.ok));
	} catch (error) {
		log.error("Error deleting new space");
	}
};

export const updateSpace = async (req: Request, res: Response) => {
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
		log.error("Error deleting new space");
	}
};
