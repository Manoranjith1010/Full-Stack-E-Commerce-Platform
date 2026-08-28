import { Router } from "express";
import productRoutes from "../modules/products/product.routes";
import authRoutes from "../modules/auth/auth.routes";
import adminRoutes from "../modules/admin/admin.routes";
import userRoutes from "../modules/users/user.routes";
import { prisma } from "../config/prisma";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true, message: "API is healthy" });
  } catch (error) {
    console.error("[health] database check failed:", error);
    res.status(503).json({ success: false, message: "API is unhealthy" });
  }
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/products", productRoutes);

export default router;
