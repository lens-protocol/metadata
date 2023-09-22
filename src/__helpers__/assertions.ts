import { expect } from '@jest/globals';
import { SafeParseReturnType } from 'zod';

import { formatZodError } from '../formatters';

export function expectResult(
  fn: () => SafeParseReturnType<unknown, unknown>,
): ReturnType<typeof expect> {
  const result = fn();

  if (result.success) {
    return expect(result.data);
  }

  return expect(formatZodError(result.error));
}
