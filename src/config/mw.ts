import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "../routes";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { serverConfiguration } from ".";

dotenv.config();

export default function mw(app: Application, req: Request, res: Response, next: NextFunction) {
	app.use(
		cors(),
		express.json(),
		express.urlencoded({ extended: false }),
		helmet(),
		cookieParser(),
		morgan(serverConfiguration.getMorganOptions().format, serverConfiguration.getMorganOptions().options),
		serverConfiguration.tokenHandler,
		routes
	);

	return app;
}
