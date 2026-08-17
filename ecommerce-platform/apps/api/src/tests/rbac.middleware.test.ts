import assert from "node:assert/strict";
import test from "node:test";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { NextFunction, Response } from "express";

import { env } from "../config/env";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { AuthenticatedRequest } from "../types/auth.types";

type JsonPayload = {
  success: boolean;
  message: string;
};

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

  return {
    res,
    getStatusCode: () => statusCode,
    getPayload: () => payload,
  };
}

test("authenticate returns 401 when authorization header is missing", () => {
  const req = { headers: {} } as AuthenticatedRequest;
  const { res, getStatusCode, getPayload } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authenticate(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(getStatusCode(), 401);
  assert.deepEqual(getPayload(), {
    success: false,
    message: "Authentication required",
  });
});

test("authenticate returns 401 for malformed authorization header", () => {
  const req = {
    headers: {
      authorization: "Token abc123",
    },
  } as AuthenticatedRequest;
  const { res, getStatusCode, getPayload } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authenticate(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(getStatusCode(), 401);
  assert.deepEqual(getPayload(), {
    success: false,
    message: "Invalid authorization header",
  });
});

test("authenticate returns 401 for invalid token", () => {
  const req = {
    headers: {
      authorization: "Bearer invalid-token",
    },
  } as AuthenticatedRequest;
  const { res, getStatusCode, getPayload } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authenticate(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(getStatusCode(), 401);
  assert.deepEqual(getPayload(), {
    success: false,
    message: "Invalid or expired access token",
  });
});

test("authenticate sets req.user and calls next for valid token", () => {
  const token = jwt.sign(
    {
      sub: "user-1",
      role: Role.CUSTOMER,
    },
    env.ACCESS_TOKEN_SECRET
  );

  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  } as AuthenticatedRequest;

  const { res, getStatusCode } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authenticate(req, res, next);

  assert.equal(getStatusCode(), 200);
  assert.equal(nextCalled, true);
  assert.deepEqual(req.user, {
    id: "user-1",
    role: Role.CUSTOMER,
  });
});

test("authenticate returns 401 when token has unsupported role", () => {
  const token = jwt.sign(
    {
      sub: "user-2",
      role: "HACKER",
    },
    env.ACCESS_TOKEN_SECRET
  );

  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  } as AuthenticatedRequest;
  const { res, getStatusCode, getPayload } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authenticate(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(getStatusCode(), 401);
  assert.deepEqual(getPayload(), {
    success: false,
    message: "Invalid user role",
  });
});

test("authorize returns 401 when user is missing", () => {
  const req = { headers: {} } as AuthenticatedRequest;
  const { res, getStatusCode, getPayload } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authorize(Role.ADMIN)(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(getStatusCode(), 401);
  assert.deepEqual(getPayload(), {
    success: false,
    message: "Authentication required",
  });
});

test("authorize returns 403 when user role is not allowed", () => {
  const req = {
    headers: {},
    user: {
      id: "user-3",
      role: Role.CUSTOMER,
    },
  } as AuthenticatedRequest;
  const { res, getStatusCode, getPayload } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authorize(Role.ADMIN)(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(getStatusCode(), 403);
  assert.deepEqual(getPayload(), {
    success: false,
    message: "You do not have permission to perform this action",
  });
});

test("authorize allows access when user role is allowed", () => {
  const req = {
    headers: {},
    user: {
      id: "admin-1",
      role: Role.ADMIN,
    },
  } as AuthenticatedRequest;
  const { res, getStatusCode, getPayload } = createMockResponse();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  authorize(Role.ADMIN)(req, res, next);

  assert.equal(nextCalled, true);
  assert.equal(getStatusCode(), 200);
  assert.equal(getPayload(), null);
});