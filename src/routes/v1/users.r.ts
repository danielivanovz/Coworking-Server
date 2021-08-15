import { Router } from "express";

import * as userController from "../../controllers/users.c";

const router = Router();

router.post("/", userController.addUser);
router.delete("/", userController.deleteUser);
router.put("/", userController.updateUser);
router.get("/list", userController.getUsers);

router.get("/retrieve/:username", userController.getUserIDbyUsername);
router.get("/:query", userController.getUserWithQuery);

export default router;
