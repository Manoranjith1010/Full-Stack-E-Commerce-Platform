import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import path from "node:path";

const envModulePath = path.join(__dirname, "..", "config", "env.js");

function runWithEnv(env: Record<string, string>) {
  return spawnSync(process.execPath, ["-e", `require(${JSON.stringify(envModulePath)})`], {
    env: { PATH: process.env.PATH ?? "", ...env },
    encoding: "utf-8",
  });
}

test("env module exits with an error when ACCESS_TOKEN_SECRET is missing in production", () => {
  const result = runWithEnv({
    NODE_ENV: "production",
    DATABASE_URL: "postgresql://user:pass@localhost:5432/db",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /ACCESS_TOKEN_SECRET/);
});

test("env module loads successfully with a valid production configuration", () => {
  const result = runWithEnv({
    NODE_ENV: "production",
    DATABASE_URL: "postgresql://user:pass@localhost:5432/db",
    ACCESS_TOKEN_SECRET: "a".repeat(32),
  });

  assert.equal(result.status, 0);
});
