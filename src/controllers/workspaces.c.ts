import { Router, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Workspace } from "../models";
import { Collections } from "../types";

const router = Router();

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
				"address.city": req.params["city"].toLowerCase(),
				name: req.params["name"].toLowerCase(),
			})
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city and name with error: ", error);
	}
};

export const getWorkspacesIDByName = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.findOne({ name: { $regex: <string>req.params["name"] } });

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<Workspace>response._id));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
};
