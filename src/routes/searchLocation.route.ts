import {Router, Request, Response} from 'express';
import { db } from '../db';
import env from '../env';


const router = Router();

router.get('/location', async(req:Request, res:Response) => {
    try {
        const collection = env.getCollection('workspace');
        const resDB = await db.collection(collection).find();

        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(resDB));
    } 
    catch(err){
        console.log('Error finding space by location');  
    }


});

export default router;