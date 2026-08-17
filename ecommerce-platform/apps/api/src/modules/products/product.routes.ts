import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

router.get("/", productController.getProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);

export default router;
