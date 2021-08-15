import { Router } from "express";

import * as userController from "../../controllers/users.c";

const router = Router();

router.post("/user", userController.addUser);
router.delete("/user", userController.deleteUser);
router.put("/user", userController.updateUser);

router.get("/user-id/:username", userController.getUserIDbyUsername);
router.get("/users", userController.getUsers);
router.get("/user/:query", userController.getUserWithQuery);

export default router;
