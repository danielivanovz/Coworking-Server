import { Request, Response } from "express";
import { ReturnDocument } from "mongodb";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { User, ObjectId } from "../models";
import { Collections } from "../types";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const response: Array<User> = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.find()
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error listing all users: ", error);
	}
};

export const getUserWithQuery = async (req: Request, res: Response) => {
	try {
		const fieldQuery: string = Object.keys(req.query).toString().toLowerCase();
		const response: Array<User> = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.find({
				[fieldQuery]: <string>req.query[fieldQuery],
			})
			.toArray();

		res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(response));
	} catch (error) {
		log.error("Error listing all users: ", error);
	}
};

export const getUserIDbyUsername = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: req.params.username });

		res
			.setHeader("Content-type", "application/json")
			.status(200)
			.end(JSON.stringify(<User>response._id));
	} catch (error) {
		log.error("Error listing all users: ", error);
	}
};

export const addUser = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.insertOne(req.body);

		res
			.setHeader("Content-type", "application/json")
			.status(201)
			.end(JSON.stringify(response.insertedId));
	} catch (error) {
		log.error("Error adding new user");
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) });

		res.setHeader("Content-type", "application/json").status(201).end(JSON.stringify(response.ok));
	} catch (error) {
		log.error("Error deleting user");
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const response = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOneAndUpdate(
				{ _id: new ObjectId(<string>req.body.id) },
				{ $set: req.body },
				{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
			);

		res
			.setHeader("Content-type", "application/json")
			.status(201)
			.end(JSON.stringify(response.value));
	} catch (error) {
		log.error("Error updating user");
	}
};
