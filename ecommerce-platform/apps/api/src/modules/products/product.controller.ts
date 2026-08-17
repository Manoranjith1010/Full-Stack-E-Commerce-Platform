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

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, slug, description, price, categoryId, brandId } = req.body as {
        name?: string;
        slug?: string;
        description?: string;
        price?: number;
        categoryId?: string;
        brandId?: string;
      };

      if (!name || !slug || !description || price === undefined || !categoryId || !brandId) {
        const err = new Error("name, slug, description, price, categoryId and brandId are required");
        (err as any).statusCode = 400;
        throw err;
      }

      const product = await productService.createProduct({
        name,
        slug,
        description,
        price,
        categoryId,
        brandId,
      });

      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const product = await productService.updateProduct(id, req.body);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await productService.deleteProduct(id);
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
