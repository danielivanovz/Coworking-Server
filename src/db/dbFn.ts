import { InsertOneResult } from 'mongodb';
import { env } from '../config';
import { Collections } from '../types';
import { mongo } from '.';

export const dbFindOne = async <T>(query: object, type: T) => {
	return (await mongo.db
		.collection(env.getCollection(Collections.USERS_COLLECTION))
		.findOne(query)) as unknown as typeof type;
};

export const dbInsertOne = async (query: object) => {
	return (await mongo.db
		.collection(env.getCollection(Collections.USERS_COLLECTION))
		.insertOne(query)) as InsertOneResult<Document>;
};
