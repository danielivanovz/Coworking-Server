import { NextFunction, response, Response } from "express";
import { ErrorResponse, ErrorType, FeedbackType } from "../types/commons";

response.customSuccess = function (
	httpStatusCode: number,
	message: string,
	type: FeedbackType
): Response {
	const data = new Date();
	return this.status(httpStatusCode).json({ type, message, data });
};

response.customError = function (
	httpStatusCode: number,
	message: ErrorResponse["message"],
	errorType: ErrorResponse["errorType"]
): Response {
	const data = new Date();
	return this.status(httpStatusCode).json({ message, errorType, data });
};

import statusList from "../types/status";

export const errorHandler = (
	type: FeedbackType,
	status: number,
	errorType: ErrorType,
	res: Response,
	next: NextFunction
) => {
	switch (type) {
		case FeedbackType.SUCCESS:
			return res.customSuccess(status, type, statusList[status]);
		case FeedbackType.FAILURE:
			return res.customSuccess(status, statusList[status], errorType);
	}
};
