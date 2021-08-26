import { serverConfiguration } from './config/config';
import { createServer } from './config';

const startServer = async () => {
	serverConfiguration.startServer(createServer());
	await serverConfiguration.connectMongo();
};

startServer();
