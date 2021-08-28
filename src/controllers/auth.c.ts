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
				? res.status(201).send({ username: req.body.username, token: await createToken(req.body.username) })
				: feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, 'Token not created')
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, 'Login Failed')
		}
	}

	public async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const { username, email }: Pick<User, 'username' | 'email'> = req.body as User
			;(await mongo.findOne({ email: email }, 'USERS', req.body as User))
				? await passwordHasher(req)
				: feedbackHandler(FeedbackType.FAILURE, 409, ErrorType.AUTH, res, next, 'User Already Exist. Please Login')
			res
				.status(201)
				.send({ id: (await mongo.insertOne(req.body, 'USERS')).insertedId, token: await createToken(username) })
		} catch (error) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.AUTH, res, next, 'Failed signing up. Please try again.')
		}
	}

	public async logout(req: Request, res: Response, next: NextFunction) {
		try {
			res.clearCookie('jwt-exp').clearCookie('username').status(200).send({ message: 'Successfully logged out' })
		} catch (error) {}
	}
}

export const authLayer = new AuthController()
