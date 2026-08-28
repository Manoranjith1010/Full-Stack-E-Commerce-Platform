import assert from "node:assert/strict";
import test from "node:test";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { validate } from "../middleware/validate.middleware";
import { AppError } from "../utils/app-error";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

test("validate calls next() with no error and normalizes body on valid input", () => {
  const req = { body: { email: "USER@Example.com".toLowerCase(), password: "password123" } } as Request;
  let nextArg: unknown;
  const next: NextFunction = (err?: unknown) => {
    nextArg = err;
  };

  validate(schema)(req, {} as Response, next);

  assert.equal(nextArg, undefined);
  assert.deepEqual(req.body, { email: "user@example.com", password: "password123" });
});

test("validate calls next(AppError(400)) on invalid input", () => {
  const req = { body: { email: "not-an-email", password: "short" } } as Request;
  let nextArg: unknown;
  const next: NextFunction = (err?: unknown) => {
    nextArg = err;
  };

  validate(schema)(req, {} as Response, next);

  assert.ok(nextArg instanceof AppError);
  assert.equal((nextArg as AppError).statusCode, 400);
});
