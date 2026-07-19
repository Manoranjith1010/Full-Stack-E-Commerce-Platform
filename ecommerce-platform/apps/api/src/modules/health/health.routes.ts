import { Router } from "express";
import { validateRequest } from "../../presentation/middleware/validate-request";
import { HealthController } from "./health.controller";
import { HealthRepository } from "./health.repository";
import { HealthService } from "./health.service";
import { healthQuerySchema } from "./health.validation";

const healthRouter = Router();
const healthRepository = new HealthRepository();
const healthService = new HealthService(healthRepository);
const healthController = new HealthController(healthService);

healthRouter.get(
  "/",
  validateRequest({
    query: healthQuerySchema,
  }),
  healthController.getHealth,
);

export { healthRouter };
