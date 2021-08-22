import { NextFunction, response, Response } from "express";
import { ErrorResponse, ErrorType, FeedbackType } from "../types/commons";

response.customSuccess = function (
	httpStatusCode: number,
	type: FeedbackType,
	statustype: string,
	message: ErrorResponse["message"],
	errorType: null
): Response {
	const data = new Date();
	return this.status(httpStatusCode).json({ type, statustype, message, data });
};

response.customError = function (
	httpStatusCode: number,
	type: FeedbackType,
	statustype: string,
	message: ErrorResponse["message"],
	errorType: ErrorResponse["errorType"]
): Response {
	const data = new Date();
	return this.status(httpStatusCode).json({type, statustype, message, errorType, data });
};

import statusList from "../types/status";

export const errorHandler = (
	type: FeedbackType,
	status: number,
	message: string,
	errorType: ErrorType,
	res: Response,
	next: NextFunction
) => {
	switch (type) {
		case FeedbackType.SUCCESS:
			return res.customSuccess(status, type, statusList[status], message, errorType);
		case FeedbackType.FAILURE:
			return res.customError(status, type, statusList[status], message, errorType);
	}
};
