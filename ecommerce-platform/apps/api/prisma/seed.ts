import "dotenv/config";
import { PrismaClient, DiscountType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "electronics" },
      update: {},
      create: { name: "Electronics", slug: "electronics" },
    }),
    prisma.category.upsert({
      where: { slug: "fashion" },
      update: {},
      create: { name: "Fashion", slug: "fashion" },
    }),
    prisma.category.upsert({
      where: { slug: "books" },
      update: {},
      create: { name: "Books", slug: "books" },
    }),
    prisma.category.upsert({
      where: { slug: "home-garden" },
      update: {},
      create: { name: "Home & Garden", slug: "home-garden" },
    }),
  ]);

  // Brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: "apple" },
      update: {},
      create: { name: "Apple", slug: "apple" },
    }),
    prisma.brand.upsert({
      where: { slug: "samsung" },
      update: {},
      create: { name: "Samsung", slug: "samsung" },
    }),
    prisma.brand.upsert({
      where: { slug: "generic" },
      update: {},
      create: { name: "Generic", slug: "generic" },
    }),
  ]);

  // Sample products
  const products = [
    {
      name: "Wireless Earbuds",
      slug: "wireless-earbuds",
      description: "High-quality wireless earbuds with noise cancellation.",
      price: 79.99,
      categoryId: categories[0].id, // Electronics
      brandId: brands[1].id, // Samsung
    },
    {
      name: "Classic T-Shirt",
      slug: "classic-t-shirt",
      description: "Comfortable everyday cotton t-shirt.",
      price: 19.99,
      categoryId: categories[1].id, // Fashion
      brandId: brands[2].id, // Generic
    },
    {
      name: "The Pragmatic Programmer",
      slug: "pragmatic-programmer",
      description: "A classic guide to software craftsmanship.",
      price: 39.99,
      categoryId: categories[2].id, // Books
      brandId: brands[2].id, // Generic
    },
  ];

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });

    // Create inventory for each product
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: { productId: product.id, quantity: 100 },
    });
  }

  // Sample coupon
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      minOrderAmount: 50,
      maxUses: 1000,
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
