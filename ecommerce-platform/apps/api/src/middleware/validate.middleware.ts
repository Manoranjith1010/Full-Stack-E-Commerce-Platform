import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/app-error";

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".") || "body"}: ${issue.message}`)
        .join("; ");
      return next(new AppError(message, 400));
    }

    req.body = result.data;
    next();
  };
}
