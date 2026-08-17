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
};
