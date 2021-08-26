import { Application, Request, Response, NextFunction } from "express";
import { mongo } from "../db";
import log from "../logger";
import * as dotenv from "dotenv";
import { env } from "./env";
import session from "express-session";
import morgan from "morgan";
import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { feedbackHandler } from "../utils";
import { ErrorType, FeedbackType } from "../types/commons";
import path from "path/posix";
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
			await mongo.establishConnection(this.dbName);
		} catch (error) {
			log.error("Couldn't establish connection with database");
		}
	}

	async tokenHandler(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization.replace("Bearer ", "");
		if (req.path !== "/v1/auth/login" && req.path !== "/v1/auth/signup") {
			jwt.verify(token, process.env.SECRET_TOKEN, (err, dec) => {
				if (!err) {
					res.cookie("jwt-exp", dec.exp, { httpOnly: true }).cookie("payload", dec["username"], { httpOnly: true });
					return next();
				}
				feedbackHandler(FeedbackType.FAILURE, 401, ErrorType.AUTH, res, next, "Invalid Token");
			});
		} else {
			next();
		}
	}
}

export const serverConfiguration = new ServerConfiguration();
