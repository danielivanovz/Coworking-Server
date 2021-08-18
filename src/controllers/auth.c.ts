import { Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";
import { User } from "../models";
import { Document, InsertOneResult } from "mongodb";
import { createToken } from "../utils/tokenManager";
import { passwordCompare, passwordHash } from "../utils/passwordManager";

export const login = async (req: Request, res: Response) => {
	try {
		log.info("here");
		const data: User = req.body;
		const response: Document = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: data.username });

		if (response && (await passwordCompare(data.password, response.password))) {
			const token = await createToken(data.username);
			res.status(200).send({ id: <User>response._id, token: token });
		} else {
			res.status(400).send("Invalid Credentials");
		}
	} catch (error) {
		log.error("Error finding user with error: ", error);
	}
};

export const signup = async (req: Request, res: Response) => {
	try {
		const data: User = req.body;

		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ email: data.email });

		if (response) {
			return res.status(409).send("User Already Exist. Please Login");
		} else {
			data.password = await passwordHash(data.password);
			const response: InsertOneResult<Document> = await db
				.collection(env.getCollection(Collections.USERS_COLLECTION))
				.insertOne(data);

			const token = await createToken(data.username);
			res.status(201).send({ id: response.insertedId, token: token });
		}
	} catch (error) {
		log.error(error);
	}
};
