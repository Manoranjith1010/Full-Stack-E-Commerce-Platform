import "./config/env";
import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";

const server = app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
});

function shutdown(signal: string) {
  console.log(`[server] Received ${signal}, shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("[server] Shutdown complete");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("[server] Forced shutdown after timeout");
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled promise rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[server] Uncaught exception:", error);
  process.exit(1);
});
