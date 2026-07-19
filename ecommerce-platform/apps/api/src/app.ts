import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { AppError } from "./common/errors/app-error";
import { createSuccessResponse } from "./common/http/api-response";
import { env } from "./config/env";
import { errorHandler } from "./presentation/middleware/error-handler";
import { notFoundHandler } from "./presentation/middleware/not-found-handler";
import { apiRouter } from "./presentation/routes";

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || env.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(
      new AppError(
        403,
        `Origin ${origin} is not allowed by CORS policy.`,
        "CORS_ORIGIN_NOT_ALLOWED",
      ),
    );
  },
  credentials: true,
};

app.disable("x-powered-by");
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(
  express.json({
    limit: "1mb",
  }),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
);
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (_request, response) => {
  response.status(200).json(
    createSuccessResponse("Enterprise commerce API is online.", {
      apiPrefix: env.API_PREFIX,
      environment: env.NODE_ENV,
    }),
  );
});

app.use(env.API_PREFIX, apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
