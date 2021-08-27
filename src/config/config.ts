import { Application, Request, Response, NextFunction } from 'express'
import { Environment } from './env'
import { feedbackHandler, log } from '../utils'
import { ErrorType, FeedbackType } from '../types/commons'
import { MongoOptions } from '../types/config'
import jwt from 'jsonwebtoken'

export class ServerConfiguration extends Environment {
	mongoOptions: MongoOptions = {
		ignoreUndefined: true,
		useUnifiedTopology: true
	}

	constructor() {
		super()
		this.mongoOptions.ignoreUndefined = true
		this.mongoOptions.useUnifiedTopology = true
	}

	async startServer(app: Application) {
		app.listen(this.PORT, () => {
			log.info(`Server is running at http://${this.HOST}:${this.PORT}`)
		})
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
