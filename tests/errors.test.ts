/**
 * Purpose: Validate standardized error helpers and Result helpers.
 * Inputs: codes/messages/details
 * Outputs: ensures shape and helpers behave predictably
 * Assumptions: none beyond TS types
 * Side effects: none
 */

import { describe, it, expect } from 'vitest';
import { AppError, errors, ok, err } from '../src/lib/errors.js';

describe('AppError', () => {
  it('creates standardized errors', () => {
    const e = errors.validation('Invalid email', { field: 'email' });
    expect(e).toBeInstanceOf(AppError);
    expect(e.code).toBe('VALIDATION_ERROR');
    expect(e.message).toBe('Invalid email');
    expect(e.details).toEqual({ field: 'email' });
  });
});

describe('Result', () => {
  it('ok', () => {
    const r = ok(42);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(42);
  });

  it('err', () => {
    const e = errors.notFound('No item');
    const r = err(e);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe(e);
  });
});
