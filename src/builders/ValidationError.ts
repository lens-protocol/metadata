import { z } from 'zod';

import { formatZodError } from '../formatters';

/**
 * An error that occurs when an object does not match the expected shape.
 */
export class ValidationError extends Error {
  name = 'ValidationError' as const;
}

/**
 * @internal
 */
export function evaluate<Input, Output>(result: z.SafeParseReturnType<Input, Output>): Output {
  if (result.success) {
    return result.data;
  }
  throw new ValidationError(formatZodError(result.error));
}
