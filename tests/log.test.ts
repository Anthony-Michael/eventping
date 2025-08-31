/**
 * Purpose: Validate PII redaction behavior of log utilities.
 * Inputs: strings with emails/phones
 * Outputs: ensures redacted tokens replace PII
 * Assumptions: regex patterns capture common formats
 * Side effects: none (string operations only)
 */

import { describe, it, expect } from 'vitest';
import { redact } from '../src/lib/log.js';

describe('redact', () => {
  it('redacts emails', () => {
    const input = 'Contact me at alice@example.com for details';
    const output = redact(input);
    expect(output).toBe('Contact me at [REDACTED_EMAIL] for details');
  });

  it('redacts phone numbers', () => {
    const input = 'Call +1 415-555-1234 now';
    const output = redact(input);
    expect(output).toBe('Call [REDACTED_PHONE] now');
  });
});
