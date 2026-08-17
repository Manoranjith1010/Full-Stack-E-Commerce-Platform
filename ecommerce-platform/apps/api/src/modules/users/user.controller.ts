import { NextFunction, Response } from "express";

import { AuthenticatedRequest } from "../../types/auth.types";

export const userController = {
  getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          id: req.user.id,
          role: req.user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};