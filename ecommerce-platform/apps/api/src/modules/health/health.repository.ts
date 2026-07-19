import type { RuntimeSnapshot } from "./health.types";

export class HealthRepository {
  async getRuntimeSnapshot(): Promise<RuntimeSnapshot> {
    const memoryUsage = process.memoryUsage();

    return {
      nodeVersion: process.version,
      processId: process.pid,
      memoryUsage: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
      },
    };
  }
}
