import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { LoginInput, RegisterInput } from "./auth.types";
import { AppError } from "../../utils/app-error";

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
      const { name, email, password } = req.body as RegisterInput;

      const user = await authService.register({ name, email, password });
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as LoginInput;

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
        throw new AppError("Refresh token required", 401);
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

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError("Authentication required", 401);
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

  async adminOnly(_req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ success: true, message: "Admin access granted" });
    } catch (error) {
      next(error);
    }
  },
};
