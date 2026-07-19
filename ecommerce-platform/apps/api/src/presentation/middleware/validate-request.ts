import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { asyncHandler } from "../../common/utils/async-handler";

interface RequestValidationSchema {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

export const validateRequest = (
  schema: RequestValidationSchema,
): RequestHandler =>
  asyncHandler(async (request, _response, next) => {
    if (schema.body) {
      request.body = await schema.body.parseAsync(request.body);
    }

    if (schema.query) {
      request.query = await schema.query.parseAsync(request.query);
    }

    if (schema.params) {
      request.params = await schema.params.parseAsync(
        request.params,
      );
    }

    next();
  });
