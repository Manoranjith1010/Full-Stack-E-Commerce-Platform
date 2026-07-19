import { Router } from "express";
import { createSuccessResponse } from "../../common/http/api-response";
import { env } from "../../config/env";
import { healthRouter } from "../../modules/health/health.routes";

const apiRouter = Router();

apiRouter.get("/", (_request, response) => {
  response.status(200).json(
    createSuccessResponse("Platform API is ready.", {
      name: env.APP_NAME,
      version: env.APP_VERSION,
      environment: env.NODE_ENV,
      healthEndpoint: `${env.API_PREFIX}/health`,
    }),
  );
});

apiRouter.use("/health", healthRouter);

export { apiRouter };
