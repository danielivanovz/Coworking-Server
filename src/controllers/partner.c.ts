import { Request, Response } from 'express'
import { C, choose } from '../types'
import { ObjectId, ReturnDocument } from 'mongodb'
import { Partner } from '../models'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'
import { NextFunction } from 'connect'
import { mongo } from '../db/db'

export class PartnerController {
	public async getPartner(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db.collection(choose<string>('PARTNER', C)).find().toArray()) as Partner[]

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get partner')
		}
	}

	public async getPartnerByQuery(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.findOne(new ObjectId(<string>req.query.id), 'PARTNER')) as Partner
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get partner by workspace ID')
		}
	}

	public async addPartner(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db.collection(choose<string>('PARTNER', C)).insertOne(req.body)

			res
				.setHeader('Content-type', 'application/json')
				.status(200)
				.end(JSON.stringify(<ObjectId>response.insertedId))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add partner')
		}
	}

	public async deletePartner(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('PARTNER', C))
				.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete partner')
		}
	}

	public async updatePartner(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('PARTNER', C))
				.findOneAndUpdate(
					{ _id: new ObjectId(<string>req.body.id) },
					{ $set: req.body },
					{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
				)

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot update partner')
		}
	}
}
