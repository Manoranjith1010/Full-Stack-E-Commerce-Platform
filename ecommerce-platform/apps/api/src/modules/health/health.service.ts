import { env } from "../../config/env";
import { HealthRepository } from "./health.repository";
import type {
  HealthCheckQuery,
  HealthReport,
} from "./health.types";

export class HealthService {
  constructor(
    private readonly healthRepository: HealthRepository,
  ) {}

  async getHealthReport(
    query: HealthCheckQuery,
  ): Promise<HealthReport> {
    const baseReport: HealthReport = {
      name: env.APP_NAME,
      version: env.APP_VERSION,
      environment: env.NODE_ENV,
      status: "ok",
      timestamp: new Date().toISOString(),
      uptimeInSeconds: Math.floor(process.uptime()),
      dependencies: {
        api: "operational",
        database: "unconfigured",
        cache: "unconfigured",
      },
    };

    if (!query.details) {
      return baseReport;
    }

    const details =
      await this.healthRepository.getRuntimeSnapshot();

    return {
      ...baseReport,
      details,
    };
  }
}
