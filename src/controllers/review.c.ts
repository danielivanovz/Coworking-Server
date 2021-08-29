import { Request, Response } from 'express'
import { C, choose } from '../types'
import { ObjectId, ReturnDocument } from 'mongodb'
import { Review } from '../models'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'
import { NextFunction } from 'connect'
import { mongo } from '../db/db'

export class ReviewController {
	public async getReview(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db.collection(choose<string>('REVIEW', C)).find().toArray()) as Review[]

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get review')
		}
	}

	public async getReviewByUserID(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db
				.collection(choose<string>('REVIEW', C))
				.find({ user_id: req.params[1] })
				.toArray()) as Review[]

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get review by user ID')
		}
	}

	public async getReviewByWorkspaceID(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db
				.collection(choose<string>('REVIEW', C))
				.find({ workspace_id: req.params.id })
				.toArray()) as Review[]

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get review by workspace ID')
		}
	}

	public async addReview(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db.collection(choose<string>('REVIEW', C)).insertOne(req.body)

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.insertedId))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add review')
		}
	}

	public async deleteReview(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('REVIEW', C))
				.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete review')
		}
	}

	public async updateReview(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('REVIEW', C))
				.findOneAndUpdate(
					{ _id: new ObjectId(<string>req.body.id) },
					{ $set: req.body },
					{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
				)

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot update review')
		}
	}
}
function insertOne(body: any, arg1: string) {
    throw new Error('Function not implemented.')
}

