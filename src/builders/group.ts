import { v4 } from 'uuid';

import { evaluate } from './ValidationError';
import { GroupMetadataSchemaId, GroupMetadata, GroupMetadataSchema } from '../group';

export type GroupOptions = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
  /**
   * The name of the Community.
   */
  name: string;
  /**
   * The slug for the Community.
   */
  slug: string;
  /**
   * Optional markdown formatted description of the Community.
   */
  description?: string | null;

  /**
   * Optional uri of the Community's icon.
   */
  icon?: string | null;
};

/**
 * Creates a valid GroupMetadata.
 *
 * ```ts
 * const metadata = group({
 *   name: 'XYZ',
 *   slug: 'xyz',
 *   description: 'Bringing you one step closer to achieving absolutely nothing, but in style!',
 *   icon: 'lens://BsdfA...',
 * });
 * ```
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function group({ id = v4(), ...others }: GroupOptions): GroupMetadata {
  return evaluate(
    GroupMetadataSchema.safeParse({
      $schema: GroupMetadataSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
