import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

import { env } from "../config/env";
import { AuthenticatedRequest } from "../types/auth.types";

interface AccessTokenPayload {
	sub: string;
	role: Role;
	type?: string;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	try {
		const authorization = req.headers.authorization;

		if (!authorization) {
			res.status(401).json({
				success: false,
				message: "Authentication required",
			});
			return;
		}

		const [scheme, token] = authorization.split(" ");

		if (scheme !== "Bearer" || !token) {
			res.status(401).json({
				success: false,
				message: "Invalid authorization header",
			});
			return;
		}

		const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as AccessTokenPayload;

		if (!decoded.sub || !decoded.role) {
			res.status(401).json({
				success: false,
				message: "Invalid access token",
			});
			return;
		}

		if (decoded.role !== Role.ADMIN && decoded.role !== Role.CUSTOMER) {
			res.status(401).json({
				success: false,
				message: "Invalid user role",
			});
			return;
		}

		req.user = {
			id: decoded.sub,
			role: decoded.role,
		};

		next();
	} catch {
		res.status(401).json({
			success: false,
			message: "Invalid or expired access token",
		});
	}
}
