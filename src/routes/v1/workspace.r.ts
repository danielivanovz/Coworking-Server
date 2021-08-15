import { Router } from "express";
import * as workspaceController from "../../controllers/workspaces.c";

const router = Router();

router.get("/workspace-id/:name", workspaceController.getWorkspacesIDByName);
router.get("/workspaces", workspaceController.getWorkspaces);
router.get("/workspace/:query", workspaceController.getWorkspacesByQuery);
router.get("/workspace/:location/:name", workspaceController.getWorkspacesByCityAndName);

export default router;
