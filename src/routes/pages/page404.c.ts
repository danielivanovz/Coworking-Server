import { Router, Response, Request } from "express";
import * as boom from "@hapi/boom";

const router = Router();

router.get("*", (req: Request, res: Response) => {
	return boom.notFound("Route does not exist");
});

export default router;
