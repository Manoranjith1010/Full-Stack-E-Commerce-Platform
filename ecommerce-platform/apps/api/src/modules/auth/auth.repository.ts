import { prisma } from "../../config/prisma";
import { Role } from "@prisma/client";

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  createUser(data: { name: string; email: string; password: string }) {
    return prisma.user.create({
      data: {
        ...data,
        role: Role.CUSTOMER,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  createRefreshToken(data: { tokenHash: string; userId: string; expiresAt: Date }) {
    return prisma.refreshToken.create({
      data,
    });
  },

  findRefreshToken(tokenHash: string) {
    return prisma.refreshToken.findFirst({
      where: { tokenHash },
      include: { user: true },
    });
  },

  revokeRefreshToken(id: string) {
    return prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  },
};
