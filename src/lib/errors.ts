/**
 * Purpose: Centralized error types and helpers with a single error shape.
 * Inputs: creation helpers accept message, code, details; may wrap causes
 * Outputs: standardized Error objects with safe-to-log fields
 * Assumptions: details are JSON-serializable; codes are stable identifiers
 * Side effects: none; pure construction utilities
 */

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

export interface AppErrorShape {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: Record<string, unknown>;

  constructor(shape: AppErrorShape, options?: { cause?: unknown }) {
    super(shape.message);
    this.name = 'AppError';
    this.code = shape.code;
    if (shape.details !== undefined) this.details = shape.details;
    if (options?.cause !== undefined) {
      Object.defineProperty(this, 'cause', {
        value: options.cause,
        enumerable: false,
        configurable: true,
        writable: false,
      });
    }
  }
}

function createError(code: ErrorCode) {
  return (message: string, details?: Record<string, unknown>, cause?: unknown): AppError => {
    const shape: AppErrorShape =
      details === undefined ? { code, message } : { code, message, details };
    return new AppError(shape, { cause });
  };
}

export const errors = {
  validation: createError('VALIDATION_ERROR'),
  notFound: createError('NOT_FOUND'),
  unauthorized: createError('UNAUTHORIZED'),
  forbidden: createError('FORBIDDEN'),
  conflict: createError('CONFLICT'),
  rateLimited: createError('RATE_LIMITED'),
  internal: createError('INTERNAL_ERROR'),
} as const;

export type Result<T> = { ok: true; value: T } | { ok: false; error: AppError };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function err<T = never>(error: AppError): Result<T> {
  return { ok: false, error };
}
