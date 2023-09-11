import { z } from 'zod';

import { MetadataCoreSchema } from './common/index.js';
import { SchemasRoot } from '../constants.js';

export /**
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

const MirrorMetadataSchema = z.object({
  $schema: z.literal(`${SchemasRoot}/publications/mirror/1.0.0.json`),

  lens: MetadataCoreSchema,
});
export type MirrorMetadata = z.infer<typeof MirrorMetadataSchema>;
