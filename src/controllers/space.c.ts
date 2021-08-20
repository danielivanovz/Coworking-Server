import { Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";
import { ObjectId, ReturnDocument } from "mongodb";
import { Space } from "../models";
import * as boom from "@hapi/boom";

export const getSpace = async (req: Request, res: Response) => {
	try {
		const response: Array<Space> = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		boom.badRequest("Invalid city input", error);
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
		boom.badRequest("Invalid ID input", error);
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
		boom.expectationFailed("Error creating new space", error);
	}
};

export const deleteSpace = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) });

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response.ok));
	} catch (error) {
		boom.expectationFailed("Error deleting new space", error);
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
		boom.expectationFailed("Error updating new space", error);
	}
};
