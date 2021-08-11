import {Router, Request, Response} from 'express';
import { db } from '../db';
import env from '../env';


const router = Router();

router.get('/location', async(req:Request, res:Response) => {
    try {
        //const collection = env.getCollection('spaces');
        const resDB = await db.collection('spaces').find({ location: `Bologna`}).toArray();

        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(resDB));
    } 
    catch(err){
        console.error('Error finding space by location', err);  
    }


});

export default router;