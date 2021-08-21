import { NextFunction, response, Response } from "express";
import { ErrorResponse, ErrorType, Feedback, FeedbackType } from "../types/commons";

response.customSuccess = function (httpStatusCode: number, message: string): Response {
	const data = new Date();
	return this.status(httpStatusCode).json({ message, data });
};

response.customError = function (
	httpStatusCode: number,
	message: ErrorResponse["message"],
	errorType: ErrorResponse["errorType"]
): Response {
	const data = new Date();
	return this.status(httpStatusCode).json({ message, errorType, data });
};

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
			return res.customSuccess(status, message, errorType);
		case FeedbackType.FAILURE:
			return res.customSuccess(status, message, errorType);
	}
};
