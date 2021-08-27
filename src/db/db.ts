import { MongoClient, Db, MongoDBNamespace, Collection } from 'mongodb'
import { ServerConfiguration } from '../config'
import { log } from '../utils'

class MongoConnection extends ServerConfiguration {
	client: MongoClient
	db: Db
	dbCollection: Collection

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

	setCollection(collection: string) {
		try {
			this.dbCollection = this.db.collection(collection)
		} catch (error) {}
	}
}

export const mongo = new MongoConnection()
