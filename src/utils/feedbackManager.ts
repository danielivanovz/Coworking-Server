import { NextFunction, response, Response } from "express";
import { ErrorResponse, ErrorType, FeedbackType } from "../types/commons";
import statusDescription from "../types/status";

response.customSuccess = function (httpStatusCode: number, message: string, info: string): Response {
	const date = new Date();
	return this.status(httpStatusCode).json({ SUCCESS: { INFO: message, info, DATE: date } });
};

response.customError = function (
	httpStatusCode: number,
	message: string,
	errorType: ErrorResponse["errorType"]
): Response {
	const date = new Date();
	return this.status(httpStatusCode).json({
		FAILURE: { TYPE: errorType, INFO: message, DATE: date },
	});
};

export const feedbackHandler = (
	type: FeedbackType,
	httpStatusCode: number,
	errorType: ErrorType,
	res: Response,
	next: NextFunction,
	info?: string
) => {
	const column = ": ";
	switch (type) {
		case FeedbackType.SUCCESS:
			return res.customSuccess(httpStatusCode, `${statusDescription[httpStatusCode]}`, info);
		case FeedbackType.FAILURE:
			return res.customError(
				httpStatusCode,
				`${statusDescription[httpStatusCode]}${info === undefined ? "" : column + info}`,
				errorType
			);
	}
};

// SUCCESS
//
// {
//    		"type": "SUCCESS",
//     		"statusDescription": "Bad Request",
//			"message": "Invalid Credentials.",
// 			"info": "Authentication",
//    		"data": "2021-08-22T08:12:29.748Z"
// }
