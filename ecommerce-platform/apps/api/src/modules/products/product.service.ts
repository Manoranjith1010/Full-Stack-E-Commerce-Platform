import { productRepository } from "./product.repository";
import { AppError } from "../../utils/app-error";

export const productService = {
  async getProducts() {
    return productRepository.findAll();
  },

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  },

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);
    if (!product) {
      throw new AppError("Product not found", 404);
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
      throw new AppError("Product not found", 404);
    }
  },

  async deleteProduct(id: string) {
    try {
      await productRepository.delete(id);
    } catch {
      throw new AppError("Product not found", 404);
    }
  },
};
