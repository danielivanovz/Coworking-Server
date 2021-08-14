import { Router, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/spaces", async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
});

router.get("/:retrieve", async (req: Request, res: Response) => {
	try {
		console.log(req.query);
		const response = await db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOne(new ObjectId(<string>req.query.id));

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding object by ID", error);
	}
});

export default router;
