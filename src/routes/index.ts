import { Router } from "express";
import workspaceController from "./workspaces.c";
import rootController from "./root.c";
import usersController from "./users.c";

const router = Router();

router.get("/", rootController);

router.get("/workspace-id/:name", workspaceController);
router.get("/workspaces", workspaceController);
router.get("/workspace/:query", workspaceController);
router.get("/workspace/:location/:name", workspaceController);

router.get("/user-id/:username", usersController);
router.get("/users", usersController);
router.get("/user/:query", usersController);

export default router;
