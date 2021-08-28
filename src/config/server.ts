import { Application } from 'express'
import { mongo } from '../db/db'
import { Middleware } from './middleware'
export class Server extends Middleware {
	mware: Middleware = new Middleware(this.app)
	db: typeof mongo = mongo
	app: Application

	constructor(app: Application) {
		super(app)

		this.app = app
		this.connectServer()
		this.connectMongo()
	}

	connectServer() {
		return this.startServer(this.app)
	}

	connectMongo() {
		return this.db.establishConnection()
	}
}
