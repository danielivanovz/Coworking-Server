import { NextFunction } from 'connect'
import { Request, Response } from 'express'
import { ReturnDocument } from 'mongodb'
import { mongo } from '../db/db'
import { User, ObjectId } from '../models'
import { C, choose } from '../types'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'

export class UserController {
	public async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db.collection(choose<string>('USERS', C)).find().toArray()) as User[]
	
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User')
		}
	}
	
	public async getUserByID(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db.collection(choose<string>('USERS', C)).findOne(new ObjectId(<string>req.query.id))
	
			res
				.setHeader('Content-type', 'application/json')
				.status(200)
				.end(JSON.stringify(<User>response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User by ID')
		}
	}
	
	public async getUserWithQuery(req: Request, res: Response, next: NextFunction) {
		try {
			const fieldQuery: string = Object.keys(req.query).toString().toLowerCase()
			const response = (await mongo.db
				.collection(choose<string>('USERS', C))
				.find({
					[fieldQuery]: <string>req.query[fieldQuery],
				})
				.toArray()) as User[]
	
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User with Query')
		}
	}
	
	public async getUserIDbyUsername(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db.collection(choose<string>('USERS', C)).findOne({ username: req.params.username })
	
			res
				.setHeader('Content-type', 'application/json')
				.status(200)
				.end(JSON.stringify(<User>response._id))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get User ID by Username')
		}
	}
	
	public async addUser(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db.collection(choose<string>('USERS', C)).insertOne(req.body)
	
			res.setHeader('Content-type', 'application/json').status(201).end(JSON.stringify(response.insertedId))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add User')
		}
	}
	
	public async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('USERS', C))
				.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })
	
			res.setHeader('Content-type', 'application/json').status(201).end(JSON.stringify(response.ok))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete User')
		}
	}
	
	public async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('USERS', C))
				.findOneAndUpdate(
					{ _id: new ObjectId(<string>req.body.id) },
					{ $set: req.body },
					{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
				)
	
			res.setHeader('Content-type', 'application/json').status(201).end(JSON.stringify(response.value))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot update User')
		}
	}
	
}


