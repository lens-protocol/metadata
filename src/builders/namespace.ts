import { v4 } from 'uuid';

import {
  type NamespaceMetadata,
  NamespaceMetadataSchema,
  NamespaceMetadataSchemaId,
} from '../namespace/index.js';
import type { Eip7572 } from '../tokens/eip7572';
import { evaluate } from './ValidationError';
import type { RecursiveUnbrand } from './utils';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type CollectionDetails = RecursiveUnbrand<Eip7572>;

export type NamespaceOptions = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
  /**
   * Optional markdown formatted description of the Namespace.
   */
  description?: string;

  /**
   * All the {@link Eip7572} fields.
   */
  collection?: CollectionDetails;
};

/**
 * Creates a valid NamespaceMetadata.
 *
 * ```ts
 * const metadata = namespace({
 *   description: 'A collection of usernames',
 * });
 * ```
 *
 * With NFT contract-level metadata:
 *
 * ```ts
 * const metadata = namespace({
 *   description: 'A collection of usernames',
 *   collection: {
 *     name: 'Lens Namespace',
 *     description: 'The official lens/ usernames',
 *   }
 * });
 * ```
 *
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function namespace({
  collection,
  id = v4(),
  ...others
}: NamespaceOptions): NamespaceMetadata {
  return evaluate(
    NamespaceMetadataSchema.safeParse({
      $schema: NamespaceMetadataSchemaId.LATEST,
      ...collection,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
