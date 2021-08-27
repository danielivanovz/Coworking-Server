import { Order } from '../models/order.m'

export enum WorkspaceType {
	'desktop',
	'office',
	'meeting',
	'event'
}

export interface Reservation {
	start: string
	end: string
	order_id: Order['id']
}

export enum ErrorType {
	GENERAL = 'General',
	AUTH = 'Authentication'
}

export interface ErrorResponse {
	errorType: ErrorType
	message: string
}

export interface Feedback {
	httpStatusCode: number
	message: ErrorResponse['message']
	type: ErrorResponse['errorType']
	data?: any
}

export enum FeedbackType {
	SUCCESS = 'SUCCESS',
	FAILURE = 'FAILURE'
}
