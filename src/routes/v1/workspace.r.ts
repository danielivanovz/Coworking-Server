import { Router } from "express";
import * as workspaceController from "../../controllers/workspaces.c";

const router = Router();

router.get("/retrieve/:name", workspaceController.getWorkspacesIDByName);
router.get("/list", workspaceController.getWorkspaces);
router.get("/:query", workspaceController.getWorkspacesByQuery);
router.get("/:location/:name", workspaceController.getWorkspacesByCityAndName);

export default router;
