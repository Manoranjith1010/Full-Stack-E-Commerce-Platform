import { Router } from "express";
import { Role } from "@prisma/client";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { getDashboard } from "./admin.controller";

const router = Router();

router.get("/dashboard", authenticate, authorize(Role.ADMIN), getDashboard);

export default router;