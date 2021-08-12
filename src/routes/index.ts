import { Router } from "express";
import getLocation from "./searchLocation.route";
import getHealth from "./healthCheck.route";

const router = Router();

router.get("/", getHealth);
router.get("/search/:location", getLocation);

export default router;
