import { Request, Response } from 'express'
import { mongo } from '../db'
import { env } from '../config'
import { Collections } from '../types'
import { ObjectId, ReturnDocument } from 'mongodb'
import { Space } from '../models'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'
import { NextFunction } from 'connect'

export const getSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = (await mongo.db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.find()
			.toArray()) as Space[]

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Space')
	}
}

export const getSpaceByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOne(new ObjectId(<string>req.query.id))

		res
			.setHeader('Content-type', 'application/json')
			.status(200)
			.end(JSON.stringify(<Space>response))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Space by ID')
	}
}

export const addSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db.collection(env.getCollection(Collections.SPACE_COLLECTION)).insertOne(req.body)

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.insertedId))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add Space')
	}
}

export const deleteSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete Space')
	}
}

export const updateSpace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await mongo.db
			.collection(env.getCollection(Collections.SPACE_COLLECTION))
			.findOneAndUpdate(
				{ _id: new ObjectId(<string>req.body.id) },
				{ $set: req.body },
				{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
			)

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot update Space')
	}
}
