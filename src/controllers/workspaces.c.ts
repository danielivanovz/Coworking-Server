import { NextFunction } from 'connect'
import { Request, Response } from 'express'
import { Document, InsertOneResult, ModifyResult, ReturnDocument } from 'mongodb'
import { mongo } from '../db'
import { env } from '../config'
import { ObjectId, Workspace } from '../models'
import { Collections } from '../types'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'

export const getWorkspaces = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = (await mongo.db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find()
			.toArray()) as Workspace[]

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces')
	}
}

export const getWorkspacesByQuery = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const fieldQuery: string = Object.keys(req.query).toString().toLowerCase()

		const response = (await mongo.db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find({
				[fieldQuery]: <string>req.query[fieldQuery]
			})
			.toArray()) as Workspace[]

		console.log(fieldQuery)

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces by Query')
	}
}

export const getWorkspacesByCityAndName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = (await mongo.db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.find({
				'address.city': req.params.city.toLowerCase(),
				name: req.params.name.toLowerCase()
			})
			.toArray()) as Workspace[]

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces by City and Name')
	}
}

export const getWorkspacesIDByName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response: Document = await mongo.db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.findOne({ name: { $regex: <string>req.params.name } })

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response._id))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get Workspaces by ID')
	}
}

export const addWorkspace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response: InsertOneResult<Workspace> = await mongo.db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.insertOne(req.body)

		res
			.setHeader('Content-type', 'application/json')
			.status(200)
			.end(JSON.stringify(<ObjectId>response.insertedId))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add Workspaces')
	}
}

export const deleteWorkspace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response: ModifyResult<Document> = await mongo.db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
			.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })

		res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
	} catch (error) {
		feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete Workspaces')
	}
}

export const updateWorkspace = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response: ModifyResult<Document> = await mongo.db
			.collection(env.getCollection(Collections.WORKSPACE_COLLECTION))
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
