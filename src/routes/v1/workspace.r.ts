import { Router } from "express";
import * as workspaceController from "../../controllers/workspaces.c";

const router = Router();

router.get("/retrieve/:name", workspaceController.getWorkspacesIDByName);
router.get("/list", workspaceController.getWorkspaces);
router.get("/:query", workspaceController.getWorkspacesByQuery);
router.get("/:location/:name", workspaceController.getWorkspacesByCityAndName);

router.post("/", workspaceController.addWorkspace);
router.put("/", workspaceController.updateWorkspace);
router.delete("/", workspaceController.deleteWorkspace);

export default router;
