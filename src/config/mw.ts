import cors from "cors";
import express, { Application, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "../routes";

import cookieParser from "cookie-parser";

import * as dotenv from "dotenv";
import { serverConfiguration } from ".";

dotenv.config();

export interface UserInterface {
	id: string;
	username: string;
	isAdmin: boolean;
}

export default function mw(app: Application) {
	app.use(
		cors({ credentials: true }),
		express.json(),
		express.urlencoded({ extended: false }),
		helmet(),
		cookieParser(),
		morgan(
			serverConfiguration.getMorganOptions().format,
			serverConfiguration.getMorganOptions().options
		),
		routes
	);

	return app;
}
