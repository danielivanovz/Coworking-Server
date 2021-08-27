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

export enum Collections {
	BILLING_USER_COLLECTION,
	BILLING_WORKSPACE_COLLECTION,
	COURSES_COLLECTION,
	INVOICE_COLLECTION,
	ORDER_COLLECTION,
	PARTNER_COLLECTION,
	REVIEW_COLLECTION,
	SPACE_COLLECTION,
	USERS_COLLECTION,
	WORKSPACE_COLLECTION
}
