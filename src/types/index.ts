import * as config from './config'

export const MongoOptions: config.MongoOptions = {
	useUnifiedTopology: true,
	ignoreUndefined: true
}

export const Root: config.API = {
	statusCode: 200,
	availableAPIs: [
		'/v1',
		{
			'/api': 'root',
			'/*': '404',
			'/auth': {
				'/login': 'POST login',
				'/signup': 'POST register'
			},
			'/user': {
				'/': 'GET, POST, PUT, DELETE user',
				'/retrieve': 'GET User By ID',
				'/:query': 'GET User By Field'
			},
			'/workspace': {
				'/': 'GET, POST, PUT, DELETE workspace',
				'/retrieve': 'GET workspace By ID',
				'/:query': 'GET workspace By Field',
				'/:location/:name': 'GET workspace By location AND name'
			},
			'/space': {
				'/': 'GET, POST, PUT, DELETE space',
				'/retrieve': 'GET space By ID'
			}
		}
	]
}

export enum Environments {
	dev_environment = 'string',
	prod_environment = 'prod'
}
export interface Cases<T> {
	[key: string]: () => T
}

export const C: Cases<string> = {
	BILLING_USER: () => `${process.env.BILLING_USER_COLLECTION}`,
	BILLING_WS: () => `${process.env.BILLING_WORKSPACE_COLLECTION}`,
	COURSES: () => `${process.env.COURSES_COLLECTION}`,
	INVOICE: () => `${process.env.INVOICE_COLLECTION}`,
	ORDER: () => `${process.env.ORDER_COLLECTION}`,
	PARTNER: () => `${process.env.PARTNER_COLLECTION}`,
	REVIEW: () => `${process.env.REVIEW_COLLECTION}`,
	SPACE: () => `${process.env.SPACE_COLLECTION}`,
	USERS: () => `${process.env.USERS_COLLECTION}`,
	WORKSPACE: () => `${process.env.WORKSPACE_COLLECTION}`
}

export function choose<T>(input: string, cases: Cases<T>): T {
	return cases[input]()
}
