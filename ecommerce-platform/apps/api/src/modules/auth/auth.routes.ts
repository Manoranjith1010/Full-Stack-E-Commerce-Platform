import { Router } from "express";
import { Role } from "@prisma/client";
import { authController } from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authLimiter } from "../../middleware/rate-limit.middleware";
import { registerSchema, loginSchema } from "./auth.schema";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), authController.register);
router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.post("/refresh", authLimiter, authController.refresh);
router.post("/logout", authController.logout);
router.get("/profile", authenticate, authController.getProfile);
router.get("/admin-only", authenticate, authorize(Role.ADMIN), authController.adminOnly);

export default router;
