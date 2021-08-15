import { Request, Response } from "express";
import {
	Document,
	FindOneAndDeleteOptions,
	InsertOneResult,
	ModifyResult,
	ReturnDocument,
} from "mongodb";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { ObjectId, Workspace } from "../models";
import { Collections } from "../types";

export const getWorkspaces = async (req: Request, res: Response) => {
	try {
		const response: Array<Workspace> = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
};

export const getWorkspacesByQuery = async (req: Request, res: Response) => {
	try {
		const fieldQuery: string = Object.keys(req.query).toString().toLowerCase();

		const response: Array<Workspace> = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find({
				[fieldQuery]: <string>req.query[fieldQuery],
			})
			.toArray();

		console.log(fieldQuery);

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
};

export const getWorkspacesByCityAndName = async (req: Request, res: Response) => {
	try {
		const response: Array<Workspace> = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find({
				"address.city": req.params.city.toLowerCase(),
				name: req.params.name.toLowerCase(),
			})
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city and name with error: ", error);
	}
};

export const getWorkspacesIDByName = async (req: Request, res: Response) => {
	try {
		const response: Document = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.findOne({ name: { $regex: <string>req.params.name } });

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response._id));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
};

export const addWorkspace = async (req: Request, res: Response) => {
	try {
		const response: InsertOneResult<Workspace> = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.insertOne(req.body);

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<ObjectId>response.insertedId));
	} catch (error) {
		log.error("Error creating new workspace");
	}
};

export const deleteWorkspace = async (req: Request, res: Response) => {
	try {
		const response: ModifyResult<Document> = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) });

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response.ok));
	} catch (error) {
		log.error("Error deleting new workspace");
	}
};

export const updateWorkspace = async (req: Request, res: Response) => {
	try {
		const response: ModifyResult<Document> = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.findOneAndUpdate(
				{ _id: new ObjectId(<string>req.body.id) },
				{ $set: req.body },
				{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
			);
		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(response.value));
	} catch (error) {
		log.error("Error updating new workspace");
	}
};
