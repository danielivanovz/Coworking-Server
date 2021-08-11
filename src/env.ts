import * as dotenv from "dotenv";
import log from "./logger";
dotenv.config();

enum Environments {
  dev_environment = "dev",
  prod_environment = "prod",
}

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
      return 3000;
    }
  }

  getDBUri(): string {
    return process.env.URI;
  }
  getDBName(): string {
    return process.env.DB_NAME;
  }

  getCollection(collection: string): string {
    if (collection === "workspace") {
      return process.env.WORKSPACE_COLLECTION;
    } else if (collection === "users") {
      return process.env.USERS_COLLECTION;
    } else {
      log.error("Collecton not found");
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
