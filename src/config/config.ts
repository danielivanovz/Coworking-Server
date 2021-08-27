import { Application, Request, Response, NextFunction } from 'express'
import { mongo } from '../db'
import { Environment } from './env'
import { feedbackHandler, log } from '../utils'
import { ErrorType, FeedbackType } from '../types/commons'
import { MorganConfiguraton } from '../types/config'
import jwt from 'jsonwebtoken'

export class ServerConfiguration extends Environment {
	HOST: string
	PORT: number
	morganOptions: MorganConfiguraton
	env = new Environment()

	constructor() {
		super()

		this.HOST = this.env.getHost()
		this.PORT = this.env.getPort()
		this.morganOptions = {
			format: ':method :url :status :res[content-length] - :response-time ms',
			options: { stream: { write: (message: string) => log.info(message) } }
		}
	}

	async startServer(app: Application) {
		app.listen(this.PORT, () => {
			log.info(`Server is running at http://${this.HOST}:${this.PORT}`)
		})
	}

	async connectMongo(dbName) {
		try {
			await mongo.establishConnection(dbName)
		} catch (error) {
			log.error("Couldn't establish connection with database")
		}
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
}
