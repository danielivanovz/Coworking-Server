import { Router, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";

const router = Router();

router.get("/search/:location", async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection("workspace"))
			.find({ location: req.params["location"].toLowerCase() })
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (err) {
		log.error("Error finding space by location", err);
	}
});

export default router;
