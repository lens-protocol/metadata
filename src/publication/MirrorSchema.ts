import { z } from 'zod';

import { MirrorSchemaId } from './MirrorSchemaId.js';
import { MetadataCoreSchema } from './common/index.js';

/**
 * Mirror metadata schema.
 *
 * @example
 * with `parse`:
 * ```typescript
 * MirrorMetadata.parse(valid); // => MirrorMetadata
 *
 * MirrorMetadata.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```typescript
 * MirrorMetadata.safeParse(valid);
 * // => { success: true, data: MirrorMetadata }
 *
 * MirrorMetadata.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const MirrorMetadataSchema = z.object({
  $schema: z.literal(MirrorSchemaId.LATEST),

  lens: MetadataCoreSchema,
});
export type MirrorMetadata = z.infer<typeof MirrorMetadataSchema>;
