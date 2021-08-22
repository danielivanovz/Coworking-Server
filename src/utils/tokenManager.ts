import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ErrorType, FeedbackType } from "../types/commons";
import { errorHandler } from "./feedbackManager";

export const generateJwtTime = () => {
	const expirationTime = new Date().getTime() + Number(process.env.EXPIRE_TOKEN) * 10000;
	return Math.floor(expirationTime / 1000);
};

export const createToken = async (payload: string) => {
	return jwt.sign({ username: payload }, process.env.SECRET_TOKEN, {
		issuer: process.env.ISSUER_TOKEN,
		algorithm: "HS256",
		expiresIn: generateJwtTime(),
	});

};

export const extractToken = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (token) {
		jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
			if (error) {
				errorHandler(FeedbackType.FAILURE, 401, "Token not verified", ErrorType.AUTH, res, next);
			} else {
				errorHandler(FeedbackType.SUCCESS, 200, "Verified Token", null, res, next);
				res.locals.jwt = decoded;
				next();
			}
		});
	} else {
		errorHandler(FeedbackType.FAILURE, 401, "Invalid Token", ErrorType.AUTH, res, next);
	}
};

export const updateToken = async (token: string, payload: string, res: Response, next: NextFunction) => {
	if (token) {
		return createToken(payload);
	} else {
		errorHandler(FeedbackType.FAILURE, 401, "Invalid Token", ErrorType.AUTH, res, next);
	}
};
