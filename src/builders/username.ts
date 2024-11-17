import { v4 } from 'uuid';

import { evaluate } from './ValidationError';
import { RecursiveUnbrand } from './utils';
import { Eip7572 } from '../tokens/eip7572';
import { UsernameMetadataSchemaId, UsernameMetadata, UsernameMetadataSchema } from '../username';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type CollectionDetails = RecursiveUnbrand<Eip7572>;

export type UsernameOptions = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
  /**
   * Optional markdown formatted description of the Username.
   */
  description?: string | null;

  /**
   * All the {@link Eip7572} fields.
   */
  collection?: CollectionDetails;
};

/**
 * Creates a valid UsernameMetadata.
 *
 * ```ts
 * const metadata = username({
 *   description: 'A collection of usernames',
 * });
 * ```
 *
 * With NFT contract-level metadata:
 *
 * ```ts
 * const metadata = username({
 *   description: 'A collection of usernames',
 *   collection: {
 *     name: 'Lens Usernames',
 *     description: 'The official lens/ usernames',
 *   }
 * });
 * ```
 *
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function username({ collection, id = v4(), ...others }: UsernameOptions): UsernameMetadata {
  return evaluate(
    UsernameMetadataSchema.safeParse({
      $schema: UsernameMetadataSchemaId.LATEST,
      ...collection,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
