import { Router, Request, Response } from "express";

import { db } from "../../db";

import env from "../../env";

import log from "../../logger";

import { Collections } from "../../types";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {

    try {
        
        // input di registrazione, da mettere tutti i parametri
        
        const { name, surname, email, username, password } = req.body;
        
        // verifica che sono stati inseriti i dati necessari
        
        if (!(email && password && name && surname && username)) {
            
            res.status(400).send("All input is required");
            
        }
        
        // controllare se esiste nel database
        
        const oldUser = await db
        
        .collection(env.getCollection(Collections.USERS_COLLECTION))
        
        .findOne({ email });
        
        //se esiste gia, saltare la registrazione
        
        if (oldUser) {
        
            return res.status(409).send("User Already Exist. Please Login");
        
            //res.redirect('../login');
        
        }
        
        //criptare la password
        
        const encryptedPassword = await bcrypt.hash(password, 10);
        
        // inserire nel database
        
        const user = await db
        
        .collection(env.getCollection(Collections.USERS_COLLECTION))
        
        .insertOne({
                
                //da mettere tutti i dati necessari
                
                name: name,
                
                surname: surname,
                
                email: email,
                
                username: username,
                
                password: encryptedPassword,
                
            });
        
        // Creare token
        
        const token = jwt.sign(
        
            { username: username },
        
            process.env.TOKEN_KEY,
        
            {
        
            expiresIn: "2h",
        
            });
        
        // return new user
        
        res.status(201).json(user);
        
        res.json(token);
        
    } catch (err) {
    
        console.log(err);
    
    }
    
});

export default router;