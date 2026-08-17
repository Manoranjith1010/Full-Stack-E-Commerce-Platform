import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      const err = new Error("Authentication required") as Error & { statusCode?: number };
      err.statusCode = 401;
      return next(err);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const err = new Error("Forbidden") as Error & { statusCode?: number };
      err.statusCode = 403;
      return next(err);
    }

    return next();
  };
}
