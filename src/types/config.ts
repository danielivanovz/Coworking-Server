import { IncomingMessage, ServerResponse } from 'http'
import morgan from 'morgan'

export interface MongoOptions {
	useUnifiedTopology: boolean
	ignoreUndefined: boolean
}

export interface API {
	statusCode: number
	availableAPIs: Object
}

export interface MorganConfiguraton {
	format: string
	options: morgan.Options<IncomingMessage, ServerResponse>
}
