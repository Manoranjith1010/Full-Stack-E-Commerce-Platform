import { Request, Response, NextFunction } from "express";
import { productService } from "./product.service";

export const productController = {
  async getProducts(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getProducts();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  },

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductBySlug(req.params.slug);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },
};
