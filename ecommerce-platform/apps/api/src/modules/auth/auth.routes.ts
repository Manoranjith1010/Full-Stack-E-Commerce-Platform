import { Router } from "express";
import { Role } from "@prisma/client";
import { authController } from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/profile", authenticate, authController.getProfile);
router.get("/admin-only", authenticate, authorize(Role.ADMIN), authController.adminOnly);

export default router;
