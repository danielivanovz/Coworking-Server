import { NextFunction } from 'connect'
import { Request, Response } from 'express'
import { Document, InsertOneResult, ModifyResult, ReturnDocument } from 'mongodb'
import { mongo } from '../db/db'
import { ObjectId, Workspace } from '../models'
import { C, choose } from '../types'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'

export class WorkspaceController {
	public async getWorkspaces(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db.collection(choose<string>('WORKSPACE', C)).find().toArray()) as Workspace[]

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces')
		}
	}

	public async getWorkspacesByQuery(req: Request, res: Response, next: NextFunction) {
		try {
			const fieldQuery: string = Object.keys(req.query).toString().toLowerCase()

			const response = (await mongo.db
				.collection(choose<string>('WORKSPACE', C))
				.find({
					[fieldQuery]: <string>req.query[fieldQuery],
				})
				.toArray()) as Workspace[]

			console.log(fieldQuery)

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces by Query')
		}
	}

	public async getWorkspacesByCityAndName(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db
				.collection(choose<string>('WORKSPACE', C))
				.find({
					'address.city': req.params.city.toLowerCase(),
					name: req.params.name.toLowerCase(),
				})
				.toArray()) as Workspace[]

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces by City and Name')
		}
	}

	public async getWorkspacesIDByName(req: Request, res: Response, next: NextFunction) {
		try {
			const response: Document = await mongo.db
				.collection(choose<string>('WORKSPACE', C))
				.findOne({ name: { $regex: <string>req.params.name } })

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response._id))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces by ID')
		}
	}

	public async addWorkspace(req: Request, res: Response, next: NextFunction) {
		try {
			const response: InsertOneResult<Workspace> = await mongo.db
				.collection(choose<string>('WORKSPACE', C))
				.insertOne(req.body)

			res
				.setHeader('Content-type', 'application/json')
				.status(200)
				.end(JSON.stringify(<ObjectId>response.insertedId))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add Workspaces')
		}
	}

	public async deleteWorkspace(req: Request, res: Response, next: NextFunction) {
		try {
			const response: ModifyResult<Document> = await mongo.db
				.collection(choose<string>('WORKSPACE', C))
				.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete Workspaces')
		}
	}

	public async updateWorkspace(req: Request, res: Response, next: NextFunction) {
		try {
			const response: ModifyResult<Document> = await mongo.db
				.collection(choose<string>('WORKSPACE', C))
				.findOneAndUpdate(
					{ _id: new ObjectId(<string>req.body.id) },
					{ $set: req.body },
					{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
				)
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.value))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot update Workspaces')
		}
	}
}
