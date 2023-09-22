import { v4 } from 'uuid';

import { evaluate } from './ValidationError';
import { RecursiveUnbrand } from './utils';
import {
  MirrorMetadata,
  MirrorMetadataSchema,
  MirrorSchemaId,
  MirrorMetadataDetails,
} from '../publication';
import { Prettify } from '../utils.js';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type MirrorDetails = Prettify<RecursiveUnbrand<Omit<MirrorMetadataDetails, 'id'>>>;
/**
 * All {@link MirrorMetadataDetails} fields with:
 * - `id` defaults to a UUID
 */
export type MirrorOptions = MirrorDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};
/**
 * Creates a valid MirrorMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = mirror({
 *   appId: 'com.example.app',
 * });
 * ```
 */
export function mirror({ id = v4(), ...others }: MirrorOptions): MirrorMetadata {
  return evaluate(
    MirrorMetadataSchema.safeParse({
      $schema: MirrorSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
