import bcrypt from "bcrypt";
import { authRepository } from "./auth.repository";
import { jwtService } from "./jwt.service";
import { AuthTokens, AuthUser, LoginInput, RegisterInput } from "./auth.types";
import {
  generateRefreshToken,
  getRefreshTokenExpiry,
  hashRefreshToken,
} from "./auth.utils";

const PASSWORD_SALT_ROUNDS = 12;

function createHttpError(message: string, statusCode: number) {
  const error = new Error(message) as Error & { statusCode?: number };
  error.statusCode = statusCode;
  return error;
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthUser> {
    const normalizedEmail = input.email.trim().toLowerCase();

    const existingUser = await authRepository.findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw createHttpError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(input.password, PASSWORD_SALT_ROUNDS);

    return authRepository.createUser({
      name: input.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });
  },

  async login(input: LoginInput): Promise<AuthTokens> {
    const normalizedEmail = input.email.trim().toLowerCase();
    const user = await authRepository.findUserByEmail(normalizedEmail);

    if (!user) {
      throw createHttpError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw createHttpError("Invalid email or password", 401);
    }

    const accessToken = jwtService.generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken();
    const tokenHash = hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiry();

    await authRepository.createRefreshToken({
      tokenHash,
      userId: user.id,
      expiresAt,
    });

    return { accessToken, refreshToken };
  },

  async refreshSession(refreshToken: string): Promise<AuthTokens> {
    const tokenHash = hashRefreshToken(refreshToken);
    const storedToken = await authRepository.findRefreshToken(tokenHash);

    if (!storedToken) {
      throw createHttpError("Invalid refresh token", 401);
    }

    if (storedToken.revokedAt) {
      throw createHttpError("Refresh token has been revoked", 401);
    }

    if (storedToken.expiresAt < new Date()) {
      throw createHttpError("Refresh token has expired", 401);
    }

    await authRepository.revokeRefreshToken(storedToken.id);

    const newAccessToken = jwtService.generateAccessToken(storedToken.user.id, storedToken.user.role);
    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashRefreshToken(newRefreshToken);
    const newExpiresAt = getRefreshTokenExpiry();

    await authRepository.createRefreshToken({
      tokenHash: newRefreshTokenHash,
      userId: storedToken.user.id,
      expiresAt: newExpiresAt,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logoutUser(refreshToken: string): Promise<void> {
    const tokenHash = hashRefreshToken(refreshToken);
    const storedToken = await authRepository.findRefreshToken(tokenHash);

    if (!storedToken || storedToken.revokedAt) {
      return;
    }

    await authRepository.revokeRefreshToken(storedToken.id);
  },
};
