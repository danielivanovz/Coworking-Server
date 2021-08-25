import { Application } from "express";
import { establishConnection } from "../db";
import log from "../logger";
import * as dotenv from "dotenv";
import { env } from "./env";
dotenv.config();

class ServerConfiguration {
	HOST: string;
	PORT: number;
	dbName: string;

	constructor() {
		this.HOST = env.getHost();
		this.PORT = env.getPort();
		this.dbName = env.getDBName();
	}

	async startServer(app: Application) {
		app.listen(this.PORT, () => {
			log.info(`Server is running at http://${this.HOST}:${this.PORT}`);
		});
	}

	async connectMongo() {
		try {
			await establishConnection(this.dbName);
		} catch (error) {
			log.error("Couldn't establish connection with database");
		}
	}
}

export const serverConfiguration = new ServerConfiguration();
