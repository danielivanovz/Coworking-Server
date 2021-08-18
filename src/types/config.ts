export interface MongoOptions {
	useUnifiedTopology: boolean;
	ignoreUndefined: boolean;
}

export interface API {
	statusCode: number;
	availableAPIs: Object;
}
