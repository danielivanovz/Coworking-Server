import { Router } from "express";

import * as spaceController from "../../controllers/space.c";

const router = Router();

router.get("/spaces", spaceController.getSpace);
router.get("/space/retrieve", spaceController.getSpaceByID);

export default router;
