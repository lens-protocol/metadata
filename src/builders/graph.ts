import { v4 } from 'uuid';

import { type GraphMetadata, GraphMetadataSchema, GraphMetadataSchemaId } from '../graph';
import { evaluate } from './ValidationError';

export type GraphOptions = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
  /**
   * The name of the Graph.
   */
  name: string;
  /**
   * Optional markdown formatted description of the Graph.
   */
  description?: string;
};

/**
 * Creates a valid GraphMetadata.
 *
 * ```ts
 * const metadata = graph({
 *   name: 'XYZ',
 *   description: 'Bringing you one step closer to achieving absolutely nothing, but in style!',
 * });
 * ```
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function graph({ id = v4(), ...others }: GraphOptions): GraphMetadata {
  return evaluate(
    GraphMetadataSchema.safeParse({
      $schema: GraphMetadataSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
