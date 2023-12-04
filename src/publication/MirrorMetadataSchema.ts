import { z } from 'zod';

import { MirrorSchemaId } from './MirrorSchemaId.js';
import {
  AppId,
  AppIdSchema,
  Signature,
  SignatureSchema,
  nonEmptyStringSchema,
} from '../primitives.js';
import { ShapeCheck } from '../utils.js';

export type MirrorMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * Use a UUID if unsure.
   */
  id: string;
  /**
   * The App Id that this publication belongs to.
   */
  appId: AppId;
};

const MirrorMetadataDetailsSchema: z.ZodType<MirrorMetadataDetails, z.ZodTypeDef, object> =
  z.object(
    {
      id: nonEmptyStringSchema(
        'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
      ),

      appId: AppIdSchema.describe('The App Id that this publication belongs to.'),
    },
    {
      description: 'The Lens operational metadata fields.',
    },
  );

/**
 * A Mirror metadata object.
 */
export type MirrorMetadata = ShapeCheck<{
  /**
   * The schema id.
   */
  $schema: MirrorSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: MirrorMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   *
   * @experimental DO NOT use yet
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
 * ```ts
 * MirrorMetadata.parse(valid); // => MirrorMetadata
 *
 * MirrorMetadata.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```ts
 * MirrorMetadata.safeParse(valid);
 * // => { success: true, data: MirrorMetadata }
 *
 * MirrorMetadata.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const MirrorMetadataSchema: z.ZodType<MirrorMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(MirrorSchemaId.LATEST),
  lens: MirrorMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
