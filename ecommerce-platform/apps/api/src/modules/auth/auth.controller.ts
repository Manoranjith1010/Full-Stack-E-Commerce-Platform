import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { LoginInput, RegisterInput } from "./auth.types";

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth",
};

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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as Partial<LoginInput>;

      if (!email || !password) {
        const err = new Error("email and password are required");
        (err as Error & { statusCode?: number }).statusCode = 400;
        throw err;
      }

      const tokens = await authService.login({ email, password });

      res.cookie("refreshToken", tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        data: {
          accessToken: tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken as string | undefined;

      if (!refreshToken) {
        return res.status(401).json({ success: false, message: "Refresh token required" });
      }

      const result = await authService.refreshSession(refreshToken);

      res.cookie("refreshToken", result.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken as string | undefined;

      if (refreshToken) {
        await authService.logoutUser(refreshToken);
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api/v1/auth",
      });

      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  },
};
