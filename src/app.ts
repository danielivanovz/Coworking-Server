import express from "express";
import { establishConnection } from "./db";
import createServer from "./server";
import enviramental from "./env";
import log from "./logger";

import * as dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
	const app = createServer();
	const HOST: string = enviramental.getHost();
	const PORT: number = Number(process.env.PORT) || 4000;

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.listen(PORT, () => {
		log.info(`Server is running at http://${HOST}:${PORT}`);
	});

	const dbName: string = enviramental.getDBName();
	await establishConnection(dbName);
};

startServer();
