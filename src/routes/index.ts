import { Router } from "express";
import workspaceController from "./workspaces.c";
import rootController from "./root.c";
import userController from "./users.c";
import spaceController from "./space.c";

const router = Router();

router.get("/", rootController);

router.get("/workspace-id/:name", workspaceController);
router.get("/workspaces", workspaceController);
router.get("/workspace/:query", workspaceController);
router.get("/workspace/:location/:name", workspaceController);

router.get("/user-id/:username", userController);
router.get("/?users", userController);
router.get("/user/:query", userController);

router.get("/spaces", spaceController);
router.get("/:retrieve", spaceController);

export default router;
