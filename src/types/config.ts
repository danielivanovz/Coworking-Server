import { Application } from 'express'
import { IncomingMessage, ServerResponse } from 'http'
import morgan from 'morgan'
import { ServerConfiguration } from '../config'

export interface MongoOptions {
	useUnifiedTopology: boolean
	ignoreUndefined: boolean
}

export interface API {
	statusCode: number
	availableAPIs: Object
}

export interface IApplication {
	app: Application
	config: ServerConfiguration
}

export interface MorganConfiguraton {
	format: string
	options: morgan.Options<IncomingMessage, ServerResponse>
}
