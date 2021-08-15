import { Router } from "express";

import * as spaceController from "../../controllers/space.c";

const router = Router();

router.get("/list", spaceController.getSpace);
router.get("/retrieve", spaceController.getSpaceByID);

router.post("/", spaceController.addSpace);
router.put("/", spaceController.updateSpace);
router.delete("/", spaceController.deleteSpace);

export default router;
