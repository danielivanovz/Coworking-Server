import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

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
				return res.status(404).json({ message: error.message, error });
			} else {
				res.locals.jwt = decoded;
				next();
			}
		});
	} else {
		return res.status(401).json({
			message: "Authorization Denied",
		});
	}
};

export const updateToken = async (token: string, payload: string) => {
	if (token) {
		return createToken(payload);
	} else {
		return {
			message: "Authorization Denied",
		};
	}
};
