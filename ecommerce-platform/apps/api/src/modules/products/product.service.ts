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

  async createProduct(input: {
    name: string;
    slug: string;
    description: string;
    price: number;
    categoryId: string;
    brandId: string;
  }) {
    return productRepository.create(input);
  },

  async updateProduct(
    id: string,
    input: Partial<{
      name: string;
      slug: string;
      description: string;
      price: number;
      categoryId: string;
      brandId: string;
      isActive: boolean;
    }>
  ) {
    try {
      return await productRepository.update(id, input);
    } catch {
      const err = new Error("Product not found");
      (err as any).statusCode = 404;
      throw err;
    }
  },

  async deleteProduct(id: string) {
    try {
      await productRepository.delete(id);
    } catch {
      const err = new Error("Product not found");
      (err as any).statusCode = 404;
      throw err;
    }
  },
};
