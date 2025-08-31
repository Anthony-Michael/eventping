/**
 * Purpose: Structured logging with redaction for PII (emails, phone numbers).
 * Inputs: message (string), optional context (object)
 * Outputs: writes to stdout/stderr with redacted values; returns void
 * Assumptions: context is JSON-serializable; timestamps are ISO strings
 * Side effects: console IO
 */

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const EMAIL_REGEX = /([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g;
const PHONE_REGEX = /(?:\+?\d{1,3}[\s-]?)?(?:\(\d{2,4}\)|\d{2,4})[\s-]?\d{3,4}[\s-]?\d{3,4}/g;

function redact(value: unknown): unknown {
  if (value == null) return value;
  if (typeof value === 'string') {
    return value
      .replace(EMAIL_REGEX, (_m) => '[REDACTED_EMAIL]')
      .replace(PHONE_REGEX, (_m) => '[REDACTED_PHONE]');
  }
  if (Array.isArray(value)) return value.map((v) => redact(v));
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = redact(v);
    }
    return out;
  }
  return value;
}

function safeStringify(value: JsonValue): string {
  try {
    return JSON.stringify(value);
  } catch {
    return '"[UNSERIALIZABLE]"';
  }
}

function baseLog(
  level: 'info' | 'warn' | 'error',
  message: string,
  context?: Record<string, JsonValue>,
): void {
  const entry = {
    ts: new Date().toISOString(),
    level,
    message: redact(message),
    context: context ? (redact(context) as Record<string, JsonValue>) : undefined,
  } as const;
  const line = safeStringify(entry as unknown as JsonValue);
  if (level === 'error') {
    console.error(line);
  } else {
    console.log(line);
  }
}

export const log = {
  info: (message: string, context?: Record<string, JsonValue>): void =>
    baseLog('info', message, context),
  warn: (message: string, context?: Record<string, JsonValue>): void =>
    baseLog('warn', message, context),
  error: (message: string, context?: Record<string, JsonValue>): void =>
    baseLog('error', message, context),
};

export { redact };
