import assert from "node:assert/strict";
import test from "node:test";
import { Response } from "express";

import { errorMiddleware } from "../middleware/error.middleware";
import { AppError } from "../utils/app-error";

type JsonPayload = { success: boolean; message: string };

function createMockResponse() {
  let statusCode = 200;
  let payload: JsonPayload | null = null;

  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(data: JsonPayload) {
      payload = data;
      return this;
    },
  } as unknown as Response;

  return { res, getStatusCode: () => statusCode, getPayload: () => payload };
}

test("errorMiddleware returns the AppError statusCode and message", () => {
  const { res, getStatusCode, getPayload } = createMockResponse();

  errorMiddleware(new AppError("Product not found", 404), {} as any, res, () => {});

  assert.equal(getStatusCode(), 404);
  assert.deepEqual(getPayload(), { success: false, message: "Product not found" });
});

test("errorMiddleware defaults to 500 for a plain Error", () => {
  const { res, getStatusCode, getPayload } = createMockResponse();

  errorMiddleware(new Error("boom"), {} as any, res, () => {});

  assert.equal(getStatusCode(), 500);
  // NODE_ENV is not "production" while running tests, so the message is passed through.
  assert.deepEqual(getPayload(), { success: false, message: "boom" });
});
