import { Router, Response, Request } from "express";

const router = Router();

router.get("*", (req: Request, res: Response) => {
	return res.status(404).header("Content-Type", "text/html").send(`<h1
		style="height: 10em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center">
	404 Not Found</h1>`);
});

export default router;
