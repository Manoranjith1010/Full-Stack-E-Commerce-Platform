import { prisma } from "../../config/prisma";

export const productRepository = {
  findAll() {
    return prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        brand: true,
        images: { where: { isPrimary: true } },
        inventory: true,
      },
    });
  },

  findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
        inventory: true,
        reviews: {
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
        inventory: true,
      },
    });
  },

  create(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    categoryId: string;
    brandId: string;
  }) {
    return prisma.product.create({
      data,
      include: {
        category: true,
        brand: true,
      },
    });
  },

  update(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description: string;
      price: number;
      categoryId: string;
      brandId: string;
      isActive: boolean;
    }>
  ) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        brand: true,
      },
    });
  },

  delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  },
};
