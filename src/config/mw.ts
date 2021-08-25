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
import { serverConfiguration } from ".";
dotenv.config();

export default function mw(app: Application) {
	app.use(
		cors({ credentials: true }),
		express.json(),
		express.urlencoded({ extended: false }),
		helmet(),
		session(serverConfiguration.sessionOptions),
		cookieParser(),
		morgan(
			serverConfiguration.getMorganOptions().format,
			serverConfiguration.getMorganOptions().options
		),
		passport.initialize(),
		passport.session(),
		routes
	);

	return app;
}
