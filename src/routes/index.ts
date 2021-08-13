import { Router } from "express";
import workspaceController from "./workspaces.c";
import rootController from "./root.c";
import usersController from "./user.c";

const router = Router();

router.get("/", rootController);

router.get("/search/:location", workspaceController);
router.get("/search/:location/:name", workspaceController);

router.get("/id/:username", usersController);

router.get("/users", usersController);
router.get("/user/:query", usersController);

export default router;
