declare namespace Express {
	export interface Response {
		customSuccess(httpStatusCode: number, message: string, data?: any): Response;
		customError(httpStatusCode: number, message: string, errorType: string, data?: any): Response;
	}
}
