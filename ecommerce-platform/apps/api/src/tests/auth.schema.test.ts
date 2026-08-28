import assert from "node:assert/strict";
import test from "node:test";

import { registerSchema, loginSchema } from "../modules/auth/auth.schema";

test("registerSchema rejects a short password", () => {
  const result = registerSchema.safeParse({ name: "Ada", email: "ada@example.com", password: "short" });
  assert.equal(result.success, false);
});

test("registerSchema rejects an invalid email", () => {
  const result = registerSchema.safeParse({ name: "Ada", email: "not-an-email", password: "password123" });
  assert.equal(result.success, false);
});

test("registerSchema trims name and lowercases email on success", () => {
  const result = registerSchema.safeParse({
    name: "  Ada  ",
    email: "ADA@Example.com",
    password: "password123",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.name, "Ada");
    assert.equal(result.data.email, "ada@example.com");
  }
});

test("loginSchema requires a non-empty password", () => {
  const result = loginSchema.safeParse({ email: "ada@example.com", password: "" });
  assert.equal(result.success, false);
});
