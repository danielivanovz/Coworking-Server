import { Router } from "express";

import * as userController from "../../controllers/users.c";

const router = Router();

router.post("/", userController.addUser);
router.delete("/", userController.deleteUser);
router.put("/", userController.updateUser);
router.get("/", userController.getUsers);

router.get("/retrieve", userController.getUserIDbyUsername);
router.get("/:query", userController.getUserWithQuery);

export default router;
