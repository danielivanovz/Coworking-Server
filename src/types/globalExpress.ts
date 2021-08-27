declare namespace Express {
	export interface Response {
		customSuccess(httpStatusCode: number, message: string, descritpion: string): Response
		customError(httpStatusCode: number, message: string, errorType: string): Response
	}
}
