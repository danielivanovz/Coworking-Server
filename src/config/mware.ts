import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from '../routes'
import cookieParser from 'cookie-parser'
import { ServerConfiguration } from '.'
import { IApplication, MorganConfiguraton } from '../types/config'
import { log } from '../utils'
export class Middleware extends ServerConfiguration implements IApplication {
	app: Application
	config: ServerConfiguration = new ServerConfiguration()
	morganOptions: MorganConfiguraton = {
		format: ':method :url :status :res[content-length] - :response-time ms',
		options: { stream: { write: (message: string) => log.info(message) } }
	}

	constructor(app: Application) {
		super()

		this.app = app
		this.setCors()
		this.setJSON()
		this.setUrlEncode()
		this.setHelmet()
		this.setCookieParser()
		this.setMorgan()
		this.setTokenHandler()
		this.setRoutes()
	}

	setCors() {
		this.app.use(cors())
	}

	setJSON() {
		this.app.use(express.json())
	}

	setUrlEncode() {
		this.app.use(express.urlencoded({ extended: false }))
	}

	setHelmet() {
		this.app.use(helmet())
	}

	setCookieParser() {
		this.app.use(cookieParser())
	}

	setMorgan() {
		this.app.use(morgan(this.morganOptions.format, this.morganOptions.options))
	}

	setTokenHandler() {
		this.app.use(this.tokenHandler)
	}

	setRoutes() {
		this.app.use(routes)
	}
}
