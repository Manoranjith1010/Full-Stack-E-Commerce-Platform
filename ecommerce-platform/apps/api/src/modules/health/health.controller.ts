import type { Request, Response } from "express";
import { createSuccessResponse } from "../../common/http/api-response";
import { asyncHandler } from "../../common/utils/async-handler";
import { HealthService } from "./health.service";
import type { HealthCheckQuery } from "./health.types";

export class HealthController {
  constructor(
    private readonly healthService: HealthService,
  ) {}

  getHealth = asyncHandler(
    async (
      request: Request<
        Record<string, never>,
        unknown,
        unknown,
        HealthCheckQuery
      >,
      response: Response,
    ) => {
      const healthReport =
        await this.healthService.getHealthReport(request.query);

      response.status(200).json(
        createSuccessResponse(
          "Platform API is healthy.",
          healthReport,
        ),
      );
    },
  );
}
