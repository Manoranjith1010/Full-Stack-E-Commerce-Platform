import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";
import { env } from "../../config/env";

type AccessTokenPayload = {
	sub: string;
	role: Role;
};

export const jwtService = {
	generateAccessToken(userId: string, role: Role) {
		const payload: AccessTokenPayload = {
			sub: userId,
			role,
		};

		return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
			expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
		});
	},

	verifyAccessToken(token: string) {
		return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as AccessTokenPayload;
	},
};

export type { AccessTokenPayload };
