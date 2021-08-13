import express from "express";
import { establishConnection } from "./db";
import createServer from "./server";
import env from "./env";
import log from "./logger";

const startServer = async () => {
	const app = createServer();

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.listen(8090, () => {
		log.info(`Server is running at :8090`);
	});

	const dbName: string = env.getDBName();
	await establishConnection(dbName);
};

startServer();
