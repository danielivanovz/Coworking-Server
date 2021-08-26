import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { ReturnDocument } from 'mongodb';
import { mongo } from '../db';
import { env } from '../config';
import { User, ObjectId } from '../models';
import { Collections } from '../types';
import { FeedbackType, ErrorType } from '../types/commons';
import { feedbackHandler } from '../utils';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response: Array<User> = await mongo.db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.find()
			.toArray();

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response));
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User');
	}
};

export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne(new ObjectId(<string>req.query.id));

		res
			.setHeader('Content-type', 'application/json')
			.status(200)
			.end(JSON.stringify(<User>response));
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User by ID');
	}
};

export const getUserWithQuery = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const fieldQuery: string = Object.keys(req.query).toString().toLowerCase();
		const response: Array<User> = await mongo.db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.find({
				[fieldQuery]: <string>req.query[fieldQuery],
			})
			.toArray();

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response));
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User with Query');
	}
};

export const getUserIDbyUsername = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: req.params.username });

		res
			.setHeader('Content-type', 'application/json')
			.status(200)
			.end(JSON.stringify(<User>response._id));
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User ID by Username');
	}
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db.collection(env.getCollection(Collections.USERS_COLLECTION)).insertOne(req.body);

		res.setHeader('Content-type', 'application/json').status(201).end(JSON.stringify(response.insertedId));
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add User');
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) });

		res.setHeader('Content-type', 'application/json').status(201).end(JSON.stringify(response.ok));
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete User');
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOneAndUpdate(
				{ _id: new ObjectId(<string>req.body.id) },
				{ $set: req.body },
				{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
			);

		res.setHeader('Content-type', 'application/json').status(201).end(JSON.stringify(response.value));
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot update User');
	}
};
