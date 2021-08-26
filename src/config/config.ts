import { Application } from "express";
import { establishConnection } from "../db";
import log from "../logger";
import * as dotenv from "dotenv";
import { env } from "./env";
import session from "express-session";
import morgan from "morgan";
import { IncomingMessage, ServerResponse } from "http";
dotenv.config();

interface morganConfiguraton {
	format: string;
	options: morgan.Options<IncomingMessage, ServerResponse>;
}

class ServerConfiguration {
	HOST: string;
	PORT: number;
	dbName: string;
	sessionOptions: session.SessionOptions;
	morganOptions: morganConfiguraton;

	constructor() {
		this.HOST = env.getHost();
		this.PORT = env.getPort();
		this.dbName = env.getDBName();
		this.morganOptions = {
			format: ":method :url :status :res[content-length] - :response-time ms",
			options: { stream: { write: (message: string) => log.info(message) } },
		};
	}

	getMorganOptions() {
		return this.morganOptions;
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
