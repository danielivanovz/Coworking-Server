declare namespace NodeJS {
	export interface ProcessEnv {
		URI: string
		PORT: string
		NODE_ENV: string
		DB_NAME: string
		BILLING_USER_COLLECTION: string
		BILLING_WORKSPACE_COLLECTION: string
		COURSES_COLLECTION: string
		INVOICE_COLLECTION: string
		ORDER_COLLECTION: string
		PARTNER_COLLECTION: string
		REVIEW_COLLECTION: string
		SPACE_COLLECTION: string
		USERS_COLLECTION: string
		WORKSPACE_COLLECTION: string
		SECRET_TOKEN: string
		ISSUER_TOKEN: string
		EXPIRE_TOKEN: string
	}
}
