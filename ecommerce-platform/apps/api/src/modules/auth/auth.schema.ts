import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(100),
  email: z.string().trim().toLowerCase().email("must be a valid email address"),
  password: z.string().min(8, "password must be at least 8 characters").max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("must be a valid email address"),
  password: z.string().min(1, "password is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
