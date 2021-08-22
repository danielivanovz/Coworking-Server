import { NextFunction } from "connect";
import { Router, Response, Request } from "express";
import { FeedbackType, ErrorType } from "../../types/commons";
import { errorHandler } from "../../utils";

const router = Router();

router.get("*", (req: Request, res: Response, next: NextFunction) => {
	errorHandler(FeedbackType.FAILURE, 400, "Route does not Exist", ErrorType.GENERAL, res, next);
});

export default router;
