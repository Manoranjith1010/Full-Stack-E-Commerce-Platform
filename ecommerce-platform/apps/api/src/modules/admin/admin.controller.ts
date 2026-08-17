import { NextFunction, Response } from "express";

import { AuthenticatedRequest } from "../../types/auth.types";

export function getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to the admin dashboard",
      data: {
        userId: req.user?.id,
        role: req.user?.role,
      },
    });
  } catch (error) {
    next(error);
  }
}