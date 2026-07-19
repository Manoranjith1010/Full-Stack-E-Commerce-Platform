import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  APP_NAME: z.string().min(1).default("enterprise-commerce-api"),
  APP_VERSION: z.string().min(1).default("1.0.0"),
  API_PREFIX: z.string().min(1).default("/api/v1"),
  CORS_ORIGIN: z
    .string()
    .min(1)
    .default("http://localhost:3000"),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  corsOrigins: parsedEnv.CORS_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
} as const;
