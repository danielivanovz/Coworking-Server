import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { ErrorType, FeedbackType } from '../types/commons'
import { feedbackHandler } from './feedbackManager'

export const generateJwtTime = () => {
	return Number(process.env.EXPIRE_TOKEN)
}

export const createToken = async (payload: string) => {
	return jwt.sign({ username: payload }, process.env.SECRET_TOKEN, {
		issuer: process.env.ISSUER_TOKEN,
		algorithm: 'HS256',
		expiresIn: generateJwtTime(),
	})
}

export const extractToken = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (token) {
		jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
			if (error) {
				feedbackHandler(FeedbackType.FAILURE, 401, ErrorType.AUTH, res, next, 'Token not verified')
			} else {
				feedbackHandler(FeedbackType.SUCCESS, 200, null, res, next, 'Verified Token')
				res.locals.jwt = decoded
				next()
			}
		})
	} else {
		feedbackHandler(FeedbackType.FAILURE, 401, ErrorType.AUTH, res, next, 'Invalid Token')
	}
}

export const updateToken = async (token: string, payload: string, res: Response, next: NextFunction) => {
	if (token) {
		return createToken(payload)
	} else {
		feedbackHandler(FeedbackType.FAILURE, 401, ErrorType.AUTH, res, next, 'Invalid Token')
	}
}
