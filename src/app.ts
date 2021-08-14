import express from "express";
import { establishConnection } from "./db";
import createServer from "./server";
import env from "./env";
import log from "./logger";

import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const startServer = async () => {
	const app = createServer();
	const HOST: string = env.getHost();
	const PORT: number = Number(process.env.PORT) || 4000;

	app.listen(PORT, () => {
		log.info(`Server is running at http://${HOST}:${PORT}`);
	});

	const dbName: string = env.getDBName();

	try {
		await establishConnection(dbName);
	} catch (error) {
		log.error(`Couldn't establist connection with the database.`);
	}
};

startServer();
