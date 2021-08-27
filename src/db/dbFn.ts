import { InsertOneResult } from 'mongodb'
import { env } from '../config'
import { Collections } from '../types'
import { mongo } from './db'

export const dbFindOneUser = async <T>(query: object, type: T) => {
	return (await mongo.db
		.collection(env.getCollection(Collections.USERS_COLLECTION))
		.findOne(query)) as unknown as typeof type
}

export const dbInserOneUser = async (query: object) => {
	return (await mongo.db
		.collection(env.getCollection(Collections.USERS_COLLECTION))
		.insertOne(query)) as InsertOneResult<Document>
}
