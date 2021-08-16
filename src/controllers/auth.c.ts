import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { Document, InsertOneModel, InsertOneResult } from "mongodb";

export const login = async (req: Request, res: Response) => {
	try {
		const data: User = req.body;

		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: data.username });

		if (response && (await bcrypt.compare(data.password, response.password))) {
			const token = jwt.sign({ username: data.username }, process.env.SECRET_TOKEN, {
				issuer: process.env.ISSUER_TOKEN,
				algorithm: "HS256",
				expiresIn: process.env.EXPIRE_TOKEN,
			});

			res
				.setHeader("Content-type", "application/json")
				.status(200)
				.send({ id: response._id, token: token });
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

		if (
			await db
				.collection(env.getCollection(Collections.USERS_COLLECTION))
				.findOne({ email: data.email })
		) {
			return res.status(409).send("User Already Exist. Please Login");
		} else {
			data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(10));

			const response: InsertOneResult<Document> = await db
				.collection(env.getCollection(Collections.USERS_COLLECTION))
				.insertOne(data);

			const token: string = jwt.sign({ username: data.username }, process.env.SECRET_TOKEN, {
				issuer: process.env.ISSUER_TOKEN,
				algorithm: "HS256",
				expiresIn: process.env.EXPIRE_TOKEN,
			});
			res.status(201).send({ id: response.insertedId, token: token });
		}
	} catch (error) {
		log.error(error);
	}
};
