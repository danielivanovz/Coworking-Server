import {Router, Request, Response} from 'express';

const router = Router();

router.get('/location', async(req:Request, res:Response) => {
    try {
        const resDB = ;

        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(resDB));
    } 
    catch(err){
        console.log('Error finding space by location');  
    }


});

export default router;