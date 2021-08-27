import express, { Application } from 'express'
import { ServerConfiguration } from './config'
import { Middleware } from './mware'
export class Server extends Middleware implements ServerConfiguration {
	app: Application = express()
	mware: Middleware = new Middleware(this.app)
	dbName: string

	constructor(app: Application) {
		super(app)
		this.connectServer()
		this.connectMongo()
	}

	connectServer() {
		return this.mware.startServer(this.app)
	}

	connectMongo() {
		return this.mware.config.connectMongo(this.dbName)
	}
}
