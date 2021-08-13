import * as dotenv from "dotenv";
import { Environments, Collections } from "./types";

dotenv.config();

class Environment {
	private environment: String;

	constructor(environment: String) {
		this.environment = environment;
	}

	getPort(): number {
		if (this.environment === Environments.prod_environment) {
			return 8080;
		} else if (this.environment === Environments.dev_environment) {
			return 8090;
		} else {
			return Number(process.env.PORT);
		}
	}

	getDBUri(): string {
		return process.env.URI;
	}
	getDBName(): string {
		return process.env.DB_NAME;
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

	getHost(): string {
		return "localhost";
	}

	getCors(): string {
		return "http://localhost:3000";
	}
}

export default new Environment(Environments.dev_environment);
