import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase, alphanumeric, and hyphen-separated"),
  description: z.string().trim().min(1, "description is required"),
  price: z.number().positive("price must be a positive number"),
  categoryId: z.string().trim().min(1, "categoryId is required"),
  brandId: z.string().trim().min(1, "brandId is required"),
});

export const updateProductSchema = createProductSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
