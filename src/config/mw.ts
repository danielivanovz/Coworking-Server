import cors from "cors";
import express, { Application, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import log from "../logger";
import routes from "../routes";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import * as dotenv from "dotenv";
dotenv.config();

export default function mw(app: Application) {
	const stream: morgan.StreamOptions = {
		write: (message: string) => log.info(message),
	};

	app.use(cors({ credentials: true }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(helmet());
	app.use(
		session({
			secret: process.env.SECRET_TOKEN,
			resave: true,
			saveUninitialized: true,
		})
	);
	app.use(cookieParser());
	app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(routes);

	return app;
}
