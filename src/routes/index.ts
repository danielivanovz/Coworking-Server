import { Router } from "express";
import * as workspaceController from ".././controllers/workspaces.c";
import * as userController from ".././controllers/users.c";
import * as spaceController from "../controllers/space.c";
import rootController from "./pages/root.c";
import errorController from "./pages/error.c";

const router = Router();

router.get("/workspace-id/:name", workspaceController.getWorkspacesIDByName);
router.get("/workspaces", workspaceController.getWorkspaces);
router.get("/workspace/:query", workspaceController.getWorkspacesByQuery);
router.get("/workspace/:location/:name", workspaceController.getWorkspacesByCityAndName);

router.post("/user", userController.addUser);
router.delete("/user", userController.deleteUser);
router.get("/user-id/:username", userController.getUserIDbyUsername);
router.get("/users", userController.getUsers);
router.get("/user/:query", userController.getUserWithQuery);

router.get("/spaces", spaceController.getSpace);
router.get("/space/retrieve", spaceController.getSpaceByID);

router.use(rootController);
router.use(errorController);

export default router;
