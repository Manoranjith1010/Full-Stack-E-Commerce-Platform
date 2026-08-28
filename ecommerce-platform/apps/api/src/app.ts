import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import apiRoutes from "./routes";
import { env } from "./config/env";
import { generalLimiter } from "./middleware/rate-limit.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

const isProduction = env.NODE_ENV === "production";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: isProduction ? env.ALLOWED_ORIGINS : true,
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(morgan(isProduction ? "combined" : "dev"));

app.use("/api/v1", generalLimiter, apiRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
