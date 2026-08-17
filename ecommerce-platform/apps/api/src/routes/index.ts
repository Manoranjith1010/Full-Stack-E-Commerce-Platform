import { Router } from "express";
import productRoutes from "../modules/products/product.routes";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

export default router;
