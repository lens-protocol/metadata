import { type Assertion, expect } from 'vitest';
import type { SafeParseReturnType } from 'zod';

import { formatZodError } from '../formatters';

export function expectResult(fn: () => SafeParseReturnType<unknown, unknown>): Assertion<unknown> {
  const result = fn();

  if (result.success) {
    return expect(result.data);
  }

  return expect(formatZodError(result.error));
}
