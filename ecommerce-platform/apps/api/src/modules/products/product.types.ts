import { Product, Category, Brand, Inventory, ProductImage, Variant } from "@prisma/client";

export type ProductWithRelations = Product & {
  category: Category;
  brand: Brand;
  inventory: Inventory | null;
  images: ProductImage[];
  variants?: Variant[];
};
