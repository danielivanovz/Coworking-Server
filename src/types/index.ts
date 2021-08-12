interface MongoOptions {
	useUnifiedTopology: boolean;
	ignoreUndefined: boolean;
}

export const options: MongoOptions = {
	useUnifiedTopology: true,
	ignoreUndefined: true,
};

interface API {
	statusCode: number;
	availableAPIs: Array<String>;
}

export const HealthCheck: API = {
	statusCode: 200,
	availableAPIs: [`/search/:location`, `/search/:name`],
};
