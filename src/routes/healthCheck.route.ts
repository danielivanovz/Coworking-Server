import { Router, Request, Response } from "express";
import { HealthCheck } from "../types";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.setHeader("Content-type", "application/json").status(200).send(HealthCheck);
});

export default router;
