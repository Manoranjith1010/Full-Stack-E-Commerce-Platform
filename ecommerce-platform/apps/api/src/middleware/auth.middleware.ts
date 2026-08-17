import { NextFunction, Request, Response } from "express";
import { jwtService } from "../modules/auth/jwt.service";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			const err = new Error("Authorization header is required") as Error & {
				statusCode?: number;
			};
			err.statusCode = 401;
			throw err;
		}

		const [scheme, token] = authHeader.split(" ");
		if (scheme !== "Bearer" || !token) {
			const err = new Error("Invalid authorization header format") as Error & {
				statusCode?: number;
			};
			err.statusCode = 401;
			throw err;
		}

		const payload = jwtService.verifyAccessToken(token);
		req.user = {
			id: payload.sub,
			role: payload.role,
		};

		next();
	} catch (_error) {
		const err = new Error("Invalid or expired access token") as Error & {
			statusCode?: number;
		};
		err.statusCode = 401;
		next(err);
	}
}
