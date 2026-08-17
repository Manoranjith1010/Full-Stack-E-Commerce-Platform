import { Router } from "express";
import productRoutes from "../modules/products/product.routes";
import authRoutes from "../modules/auth/auth.routes";
import adminRoutes from "../modules/admin/admin.routes";
import userRoutes from "../modules/users/user.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/products", productRoutes);

export default router;
