import * as dotenv from 'dotenv';
import { Collections } from '../types';

dotenv.config();

class Environment {
	HOST: string;
	PORT: number;
	dbUri: string;
	dbName: string;
	collection: Collections;

	constructor() {
		this.dbName = process.env.DB_NAME;
		this.HOST = 'localhost';
		this.PORT = Number(process.env.PORT) || 8080;
		this.dbUri = process.env.URI;
	}

	getPort(): number {
		return this.PORT;
	}

	getHost(): string {
		return this.HOST;
	}

	getDBName(): string {
		return this.dbName;
	}

	getDBUri(): string {
		return this.dbUri;
	}

	getCollection(collection: Collections): string {
		switch (collection) {
			case Collections.BILLING_USER_COLLECTION:
				return process.env.BILLING_USER_COLLECTION;
			case Collections.BILLING_WORKSPACE_COLLECTION:
				return process.env.BILLING_WORKSPACE_COLLECTION;
			case Collections.WORKSPACE_COLLECTION:
				return process.env.WORKSPACE_COLLECTION;
			case Collections.COURSES_COLLECTION:
				return process.env.COURSES_COLLECTION;
			case Collections.INVOICE_COLLECTION:
				return process.env.INVOICE_COLLECTION;
			case Collections.ORDER_COLLECTION:
				return process.env.ORDER_COLLECTION;
			case Collections.PARTNER_COLLECTION:
				return process.env.PARTNER_COLLECTION;
			case Collections.REVIEW_COLLECTION:
				return process.env.REVIEW_COLLECTION;
			case Collections.SPACE_COLLECTION:
				return process.env.SPACE_COLLECTION;
			case Collections.USERS_COLLECTION:
				return process.env.USERS_COLLECTION;
			case Collections.WORKSPACE_COLLECTION:
				return process.env.WORKSPACE_COLLECTION;
		}
	}
}

export const env = new Environment();
