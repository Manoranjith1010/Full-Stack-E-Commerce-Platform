import { createHash, randomBytes } from "crypto";

export function generateRefreshToken(): string {
  return randomBytes(48).toString("base64url");
}

export function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function getRefreshTokenExpiry(): Date {
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + sevenDays);
}
