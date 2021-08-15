import { Router } from "express";

import space from "./space.r";
import users from "./users.r";
import workspace from "./workspace.r";

const router = Router();

router.use("/space", space);
router.use("/user", users);
router.use("/workspace", workspace);

export default router;
