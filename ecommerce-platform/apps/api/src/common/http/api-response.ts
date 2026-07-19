export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details?: unknown;
  };
}

export const createSuccessResponse = <T>(
  message: string,
  data: T,
  meta?: Record<string, unknown>,
): ApiSuccessResponse<T> => ({
  success: true,
  message,
  data,
  ...(meta ? { meta } : {}),
});

export const createErrorResponse = (
  message: string,
  code: string,
  details?: unknown,
): ApiErrorResponse => ({
  success: false,
  message,
  error: {
    code,
    ...(details ? { details } : {}),
  },
});
