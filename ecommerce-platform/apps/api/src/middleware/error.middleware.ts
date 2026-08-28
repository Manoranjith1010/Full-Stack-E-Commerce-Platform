import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { env } from "../config/env";

export function errorMiddleware(
  error: Error & { statusCode?: number; isOperational?: boolean },
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = error.statusCode ?? 500;
  const isOperational = error instanceof AppError ? error.isOperational : Boolean(error.isOperational);

  console.error(`[Error] ${statusCode}:`, error.message);
  if (!isOperational) {
    console.error(error.stack);
  }

  const message =
    isOperational || env.NODE_ENV !== "production" ? error.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message || "Internal Server Error",
  });
}
