import * as dotenv from 'dotenv'

dotenv.config()

export class Environment {
	HOST: string
	PORT: number
	dbUri: string
	dbName: string

	constructor() {
		this.dbName = process.env.DB_NAME
		this.HOST = 'localhost'
		this.PORT = Number(process.env.PORT) || 8080
		this.dbUri = process.env.URI
	}

	getPort(): number {
		return this.PORT
	}

	getHost(): string {
		return this.HOST
	}

	getDBName(): string {
		return this.dbName
	}

	getDBUri(): string {
		return this.dbUri
	}
}

export const env = new Environment()
