import { Router, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";

const router = Router();

router.get("/workspaces", async (req: Request, res: Response) => {
	try {
		const response: object = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
});

router.get("/workspace/:query", async (req: Request, res: Response) => {
	try {
		const fieldQuery: string = Object.keys(req.query).toString().toLowerCase();
		const response: object = await db
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
});

router.get("/workspace/:city/:name", async (req: Request, res: Response) => {
	try {
		const response: object = await db
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
});

router.get("/workspace-id/:name", async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.findOne({ name: { $regex: <string>req.params["name"] } });

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response._id));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
});

export default router;
