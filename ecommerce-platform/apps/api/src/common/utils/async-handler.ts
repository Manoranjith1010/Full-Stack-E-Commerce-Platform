import type { RequestHandler } from "express";

export const asyncHandler = (
  handler: RequestHandler,
): RequestHandler => {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
};
