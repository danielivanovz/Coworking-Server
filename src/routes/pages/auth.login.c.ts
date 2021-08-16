import { Router, Request, Response } from "express";

import { db } from "../../db";

import env from "../../env";

import log from "../../logger";

import { Collections } from "../../types";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const router = Router();


router.post("/login", async (req: Request, res: Response) => {

        try {

            //inserire i dati del login

            const { username, password } = req.body;

            if (!(username && password)) {

                res.status(400).send("All input is required");

            }

            //cercare l'user nel database

            const user = await db

            .collection(env.getCollection(Collections.USERS_COLLECTION))

            .findOne({ username: req.params["username"] });

            //verificare se i dati sono corretti

            if (user && (await bcrypt.compare(password, user.password))) {

                // Creare token

                const token = jwt.sign(

                { username: username },

                process.env.TOKEN_KEY,

                {

                expiresIn: "2h",

                });

                res.setHeader("Content-type", "application/json").status(200).end(JSON.stringify(user));

                res.json(token);

            }

            else{

                res.status(400).send("Invalid Credentials");

            }

        } catch (error) {

            log.error("Error finding user with error: ", error);

        }
});

export default router;