import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from '../routes'
import cookieParser from 'cookie-parser'
import { ServerConfiguration } from '.'
import { IApplication } from '../types/config'

export class Middleware extends ServerConfiguration implements IApplication {
	app: Application
	config: ServerConfiguration

	constructor(app: Application) {
		super()

		this.config = new ServerConfiguration()
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
		this.app.use(morgan(this.config.morganOptions.format, this.config.morganOptions.options))
	}

	setTokenHandler() {
		this.app.use(this.config.tokenHandler)
	}

	setRoutes() {
		this.app.use(routes)
	}
}
