import { Role } from "@prisma/client";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
