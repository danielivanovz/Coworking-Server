import { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { createToken } from '../utils/tokenManager'
import { passwordHasher, userExistsAndPasswordIsTrue } from '../utils/passwordManager'
import { feedbackHandler } from '../utils'
import { ErrorType, FeedbackType } from '../types/commons'
import { mongo } from '../db'

export class AuthController {
	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			;(await userExistsAndPasswordIsTrue(req))
				? res.status(201).send({
						...(await mongo.findOne({ username: req.body.username }, 'USERS', req.body)),
						token: await createToken(req.body.username),
				  })
				: feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, 'Token not created')
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, 'Login Failed')
		}
	}

	public async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const { username, email }: Pick<User, 'username' | 'email'> = req.body as User
			return (await mongo.findOne({ email: email }, 'USERS', req.body as User))
				? feedbackHandler(FeedbackType.FAILURE, 409, ErrorType.AUTH, res, next, 'User Already Exist. Please Login')
				: (await passwordHasher(req),
				  res
						.status(201)
						.send({ id: (await mongo.insertOne(req.body, 'USERS')).insertedId, token: await createToken(username) }))
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, 'Failed signing up. Please try again.')
		}
	}

	public async logout(req: Request, res: Response, next: NextFunction) {
		try {
			req.cookies['username'] || req.cookies['jwt-exp']
				? res.clearCookie('jwt-exp').clearCookie('username').status(200).send({ message: 'Successfully logged out' })
				: res.send({ message: 'No sessione detected' })
		} catch (error) {}
	}
}

export const authLayer = new AuthController()
