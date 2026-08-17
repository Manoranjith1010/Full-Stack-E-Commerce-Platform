import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { RegisterInput } from "./auth.types";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body as Partial<RegisterInput>;

      if (!name || !email || !password) {
        const err = new Error("name, email and password are required");
        (err as Error & { statusCode?: number }).statusCode = 400;
        throw err;
      }

      if (password.length < 8) {
        const err = new Error("Password must be at least 8 characters");
        (err as Error & { statusCode?: number }).statusCode = 400;
        throw err;
      }

      const user = await authService.register({ name, email, password });
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },
};
