import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  error: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = error.statusCode ?? 500;
  console.error(`[Error] ${statusCode}:`, error.message);

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
}
