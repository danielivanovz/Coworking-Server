import cors from 'cors'
import express, { Application, Response, Request, NextFunction } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from '../routes'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { MorganConfiguraton } from '../types/config'
import { feedbackHandler, log } from '../utils'
import { FeedbackType, ErrorType } from '../types/commons'
import { Environment } from './env'
export class Middleware extends Environment {
	app: Application
	morganOptions: MorganConfiguraton = {
		format: ':method :url :status :res[content-length] - :response-time ms',
		options: { stream: { write: (message: string) => log.info(message) } },
	}

	constructor(app: Application) {
		super()

		this.app = app
		this.app.use(this.tokenHandler)
		this.setCors()
		this.setJSON()
		this.setUrlEncode()
		this.setHelmet()
		this.setCookieParser()
		this.setMorgan()
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

	setRoutes() {
		this.app.use(routes)
	}

	async tokenHandler(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization.replace('Bearer ', '')
		if (req.path !== '/v1/auth/login' && req.path !== '/v1/auth/signup') {
			jwt.verify(token, process.env.SECRET_TOKEN, (err, dec) => {
				if (!err) {
					res.cookie('jwt-exp', dec.exp, { httpOnly: true }).cookie('username', dec['username'], { httpOnly: true })
					return next()
				}
				feedbackHandler(FeedbackType.FAILURE, 401, ErrorType.AUTH, res, next, 'Invalid Token')
			})
		} else {
			next()
		}
	}

	async startServer(app: Application) {
		app.listen(this.PORT, () => {
			log.info(`Server is running at http://${this.HOST}:${this.PORT}`)
		})
	}
}
