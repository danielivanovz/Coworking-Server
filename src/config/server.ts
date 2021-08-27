import express, { Application } from 'express'
import { mongo } from '../db/db'
import { ServerConfiguration } from './config'
import { Middleware } from './mware'
export class Server extends Middleware implements ServerConfiguration {
	mware: Middleware = new Middleware(this.app)
	db: typeof mongo = mongo

	constructor(app: Application) {
		super(app)

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
