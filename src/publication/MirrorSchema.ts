import { z } from 'zod';

import { MirrorSchemaId } from './MirrorSchemaId.js';
import { PublicationMetadataCore, PublicationMetadataCoreSchema } from './common/index.js';
import { Signature, SignatureSchema } from '../primitives.js';
import { ShapeCheck } from '../utils.js';

/**
 * A Mirror metadata object.
 */
export type MirrorMetadata = ShapeCheck<{
  $schema: MirrorSchemaId.LATEST;

  lens: PublicationMetadataCore;

  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
}>;
/**
 * Mirror metadata schema.
 *
 * @category Parse
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
export const MirrorMetadataSchema: z.ZodType<MirrorMetadata, z.ZodTypeDef, object> = z.object({
  /**
   * The schema id.
   */
  $schema: z.literal(MirrorSchemaId.LATEST),
  /**
   * The metadata details.
   */
  lens: PublicationMetadataCoreSchema,

  signature: SignatureSchema.optional(),
});
