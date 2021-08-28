import { Request, Response } from 'express'
import { C, choose } from '../types'
import { ObjectId, ReturnDocument } from 'mongodb'
import { Space } from '../models'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'
import { NextFunction } from 'connect'
import { mongo } from '../db/db'

export class SpaceController {
	public async getSpace(req: Request, res: Response, next: NextFunction)  {
		try {
			const response = (await mongo.db.collection(choose<string>('SPACE', C)).find().toArray()) as Space[]
	
			mongo.db
	
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Space')
		}
	}

	public async getSpaceByID(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db.collection(choose<string>('SPACE', C)).findOne(new ObjectId(<string>req.query.id))
	
			res
				.setHeader('Content-type', 'application/json')
				.status(200)
				.end(JSON.stringify(<Space>response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Space by ID')
		}
	}
	async addSpace(req: Request, res: Response, next: NextFunction){
		try {
			const response = await mongo.db.collection(choose<string>('SPACE', C)).insertOne(req.body)
	
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.insertedId))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add Space')
		}
	}
	
	async deleteSpace(req: Request, res: Response, next: NextFunction){
		try {
			const response = await mongo.db
				.collection(choose<string>('SPACE', C))
				.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })
	
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete Space')
		}
	}
	
	async updateSpace(req: Request, res: Response, next: NextFunction){
		try {
			const response = await mongo.db
				.collection(choose<string>('SPACE', C))
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
}




