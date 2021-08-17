import { NextFunction, response, Response } from "express";
import { ErrorResponse, Feedback } from "../types/commons";

response.customSuccess = function (
	httpStatusCode: number,
	message: string,
	data: any = null
): Response {
	return this.status(httpStatusCode).json({ message, data });
};

response.customError = function (
	httpStatusCode: number,
	message: ErrorResponse["message"],
	errorType: ErrorResponse["errorType"],
	data: any = null
): Response {
	return this.status(httpStatusCode).json({ message, errorType, data });
};

export const errorHandler = (error: Feedback, req: Request, res: Response, next: NextFunction) => {
	return res
		.status(error.httpStatusCode)
		.json({ type: error.type, message: error.message, data: error.data });
};
