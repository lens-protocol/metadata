import { z } from 'zod';
import { SignatureSchema } from './primitives';

/**
 * @internal
 */
export function rootSchema<
  Augmentation extends {
    $schema: z.ZodLiteral<string>;
    lens: z.ZodType<object, z.ZodTypeDef, object>;
  },
>(augmentation: Augmentation) {
  return z.object({
    signature: SignatureSchema.optional(),
    ...augmentation,
  });
}
