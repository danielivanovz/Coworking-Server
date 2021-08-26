import { MongoClient, Db } from 'mongodb';
import { env } from '../config';
import log from '../logger';
import { MongoOptions } from '../types';

const mongoURI: string = env.getDBUri();

export const establishConnection = async (dbName: string) => {
	const client = new MongoClient(mongoURI, MongoOptions);
	try {
		const connected = await client
			.connect()
			.finally(() => log.info('Connection to the database established - status: ' + client['topology'].s.state));

		db = connected.db(dbName);
	} catch (error) {
		log.error;
	}
	return client;
};

export let db: Db;
