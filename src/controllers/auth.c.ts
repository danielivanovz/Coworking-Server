import { NextFunction, Request, Response } from "express";
import log from "../logger";
import { User } from "../models";
import { createToken } from "../utils/tokenManager";
import { passwordHash, userExistsAndPasswordIsTrue } from "../utils/passwordManager";
import { feedbackHandler } from "../utils";
import { ErrorType, FeedbackType } from "../types/commons";
import { fn } from "../db";

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		(await userExistsAndPasswordIsTrue(req))
			? res.status(201).send({ id: req.body._id, token: await createToken(req.body.username) })
			: feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, "Token not created");
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, "Login Failed");
	}
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password, email }: Pick<User, "username" | "password" | "email"> = req.body;
		(await fn.dbFindOne({ email: email }, req.body as User))
			? feedbackHandler(FeedbackType.FAILURE, 409, ErrorType.AUTH, res, next, "User Already Exist. Please Login")
			: (req.body.password = await passwordHash(password));
		res.status(201).send({ id: (await fn.dbInsertOne(req.body)).insertedId, token: await createToken(username) });
	} catch (error) {
		log.error(error);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.clearCookie("token").status(200).send({ message: "Successfully logged out" });
	} catch (error) {}
};
