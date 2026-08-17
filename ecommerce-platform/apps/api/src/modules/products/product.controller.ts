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
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const product = await productService.getProductById(id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
      const product = await productService.getProductBySlug(slug);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },
};
