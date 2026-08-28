import { Router } from "express";
import { Role } from "@prisma/client";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";
import { productController } from "./product.controller";
import { createProductSchema, updateProductSchema } from "./product.schema";

const router = Router();

router.get("/", productController.getProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validate(createProductSchema),
  productController.createProduct
);
router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete("/:id", authenticate, authorize(Role.ADMIN), productController.deleteProduct);

export default router;
