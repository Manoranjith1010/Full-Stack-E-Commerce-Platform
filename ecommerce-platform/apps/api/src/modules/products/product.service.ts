import { productRepository } from "./product.repository";

export const productService = {
  async getProducts() {
    return productRepository.findAll();
  },

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      const err = new Error("Product not found");
      (err as any).statusCode = 404;
      throw err;
    }
    return product;
  },

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);
    if (!product) {
      const err = new Error("Product not found");
      (err as any).statusCode = 404;
      throw err;
    }
    return product;
  },
};
