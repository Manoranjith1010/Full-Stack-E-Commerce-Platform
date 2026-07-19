import app from "./app";
import { env } from "./config/env";

const server = app.listen(env.PORT, () => {
  console.log(
    `${env.APP_NAME} listening on port ${env.PORT} in ${env.NODE_ENV} mode.`,
  );
});

const shutdown = (signal: string) => {
  console.log(`Received ${signal}. Closing HTTP server.`);

  server.close((error) => {
    if (error) {
      console.error("Failed to close server gracefully.", error);
      process.exit(1);
    }

    process.exit(0);
  });
};

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => shutdown(signal));
});
