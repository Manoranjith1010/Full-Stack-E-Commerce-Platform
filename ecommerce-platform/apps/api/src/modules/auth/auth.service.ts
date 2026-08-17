import bcrypt from "bcrypt";
import { authRepository } from "./auth.repository";
import { AuthUser, RegisterInput } from "./auth.types";

const PASSWORD_SALT_ROUNDS = 12;

export const authService = {
  async register(input: RegisterInput): Promise<AuthUser> {
    const normalizedEmail = input.email.trim().toLowerCase();

    const existingUser = await authRepository.findUserByEmail(normalizedEmail);
    if (existingUser) {
      const err = new Error("Email already in use");
      (err as Error & { statusCode?: number }).statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(input.password, PASSWORD_SALT_ROUNDS);

    return authRepository.createUser({
      name: input.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });
  },
};
