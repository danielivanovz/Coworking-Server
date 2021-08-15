import { Router } from "express";

import pageRoot from "./pages/pageRoot.c";
import page404 from "./pages/page404.c";
import v1 from "./v1/";

const router = Router();

router.use("/v1", v1);

router.use(pageRoot);
router.use(page404);

export default router;
