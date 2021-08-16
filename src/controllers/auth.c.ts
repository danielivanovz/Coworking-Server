import { Request, Response } from "express";
import { db } from "../db";
import env from "../env";
import log from "../logger";
import { Collections } from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		if (!(username && password)) {
			res.status(400).send("All input is required");
		}
		const user = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ username: req.params["username"] });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ username: username }, process.env.TOKEN_KEY, {
				expiresIn: "2h",
			});

			res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(user));
			res.json(token);
		} else {
			res.status(400).send("Invalid Credentials");
		}
	} catch (error) {
		log.error("Error finding user with error: ", error);
	}
};

export const signup = async (req, res) => {
	try {
		const { name, surname, email, username, password } = req.body;

		if (!(email && password && name && surname && username)) {
			res.status(400).send("All input is required");
		}

		const oldUser = await db
			.collection(env.getCollection(Collections.USERS_COLLECTION))
			.findOne({ email });

		if (oldUser) {
			return res.status(409).send("User Already Exist. Please Login");
		}

		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = await db.collection(env.getCollection(Collections.USERS_COLLECTION)).insertOne({
			name: name,
			surname: surname,
			email: email,
			username: username,
			password: encryptedPassword,
		});

		const token = jwt.sign({ username: username }, process.env.TOKEN_KEY, {
			expiresIn: "2h",
		});
		res.status(201).json(user);
		res.json(token);
	} catch (err) {
		console.log(err);
	}
};
