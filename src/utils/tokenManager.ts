import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as boom from "@hapi/boom";

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
				return boom.notFound("token not found");
			} else {
				res.locals.jwt = decoded;
				next();
			}
		});
	} else {
		return boom.unauthorized("Authorization Denied");
	}
};

export const updateToken = async (token: string, payload: string) => {
	if (token) {
		return createToken(payload);
	} else {
		return boom.unauthorized("Authorization Denied");
	}
};
