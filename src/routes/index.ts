import { Router } from "express";
import getWorkspace from "./workspaces.c";
import getRoot from "./root.c";

const router = Router();

router.get("/", getRoot);
router.get("/search/:location", getWorkspace);
router.get("/search/:location/:name", getWorkspace);

export default router;
