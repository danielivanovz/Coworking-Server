import { Router, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";

const router = Router();

router.get("/search/:city", async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find({ "address.city": req.params["city"].toLowerCase() })
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error finding space by city with error: ", error);
	}
});

router.get("/search/:city/:name", async (req: Request, res: Response) => {
	try {
		const response = await db
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

export default router;
