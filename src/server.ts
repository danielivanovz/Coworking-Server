import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import log from "./logger";

import routes from "./routes";

export default function createServer() {
	const app: Application = express();

	const stream = {
		write: (message) => log.info(message),
	};

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(helmet());
	app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream }));

	app.use(routes);

	return app;
}
