import { Router } from "express";
import { Role } from "@prisma/client";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { productController } from "./product.controller";

const router = Router();

router.get("/", productController.getProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);
router.post("/", authenticate, authorize(Role.ADMIN), productController.createProduct);
router.put("/:id", authenticate, authorize(Role.ADMIN), productController.updateProduct);
router.delete("/:id", authenticate, authorize(Role.ADMIN), productController.deleteProduct);

export default router;
