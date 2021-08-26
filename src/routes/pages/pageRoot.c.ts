import { Router, Request, Response } from 'express';
import { Root } from '../../types';

const router = Router();

router.get('/v1/api', (req: Request, res: Response) => {
	res.setHeader('Content-type', 'application/json').status(200).send(Root);
});

export default router;
