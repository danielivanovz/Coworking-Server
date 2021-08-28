import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb'
import { Environment } from '../config'
import { C, choose } from '../types'
import { MongoOptions } from '../types/config'
import { log } from '../utils'

export class MongoConnection extends Environment {
	client: MongoClient
	db: Db
	collection: Collection
	mongoOptions: MongoOptions = {
		ignoreUndefined: true,
		useUnifiedTopology: true,
	}

	constructor() {
		super()
		this.client = new MongoClient(this.dbUri, this.mongoOptions)
		this.setDb()
	}

	async establishConnection() {
		try {
			return await this.client
				.connect()
				.finally(() => log.info('Connection to the database established - status: ' + this.client['topology'].s.state))
		} catch (error) {
			log.info('Error connecting to MongoDB Database')
		}
	}

	setDb() {
		try {
			this.db = this.client.db(this.dbName)
		} catch (error) {
			console.log(error)
		}
	}

	async findOneUser<T>(query: object, type: T) {
		return (await mongo.db.collection(choose<string>('USERS', C)).findOne(query)) as unknown as typeof type
	}

	async inserOneUser(query: object) {
		return (await mongo.db.collection(choose<string>('USERS', C)).insertOne(query)) as InsertOneResult<Document>
	}
}

export const mongo = new MongoConnection()
