import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../../common/errors/app-error";
import { createErrorResponse } from "../../common/http/api-response";
import { env } from "../../config/env";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(400).json(
      createErrorResponse(
        "Request validation failed.",
        "VALIDATION_ERROR",
        error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      ),
    );

    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json(
      createErrorResponse(
        error.message,
        error.code,
        error.details,
      ),
    );

    return;
  }

  response.status(500).json(
    createErrorResponse(
      env.NODE_ENV === "production"
        ? "Unexpected server error."
        : error instanceof Error
          ? error.message
          : "Unexpected server error.",
      "INTERNAL_SERVER_ERROR",
    ),
  );
};
