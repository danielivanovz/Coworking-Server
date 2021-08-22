import { NextFunction } from "connect";
import { Router, Response, Request } from "express";
import { FeedbackType, ErrorType } from "../../types/commons";
import { feedbackHandler } from "../../utils";

const router = Router();

router.get("*", (req: Request, res: Response, next: NextFunction) => {
	feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, "Route does not Exist");
});

export default router;
