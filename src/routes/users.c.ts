import { Router, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { User } from "../models";
import { Collections } from "../types";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
	try {
		const response: Array<User> = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error listing all users: ", error);
	}
});

router.get("/user/:query", async (req: Request, res: Response) => {
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
		log.error("Error listing all users: ", error);
	}
});

router.get("/user-id/:username", async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: req.params["username"] });

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<User>response._id));
	} catch (error) {
		log.error("Error listing all users: ", error);
	}
});

export default router;
