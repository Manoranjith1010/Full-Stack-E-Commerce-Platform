export interface HealthCheckQuery {
  details: boolean;
}

export interface RuntimeSnapshot {
  nodeVersion: string;
  processId: number;
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
}

export interface HealthReport {
  name: string;
  version: string;
  environment: string;
  status: "ok";
  timestamp: string;
  uptimeInSeconds: number;
  dependencies: {
    api: "operational";
    database: "unconfigured";
    cache: "unconfigured";
  };
  details?: RuntimeSnapshot;
}
