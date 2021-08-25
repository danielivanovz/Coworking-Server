import express, { Application } from "express";
import mw from "./mw";

export const createServer = () => {
	const app: Application = express();
	return mw(app);
};
