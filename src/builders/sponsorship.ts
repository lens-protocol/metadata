import { v4 } from 'uuid';

import {
  type SponsorshipMetadata,
  SponsorshipMetadataSchema,
  SponsorshipMetadataSchemaId,
} from '../sponsorship';
import { evaluate } from './ValidationError';

export type SponsorshipOptions = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
  /**
   * The name of the Sponsorship.
   */
  name: string;
  /**
   * An optional description of the Sponsorship.
   */
  description?: string;
};

/**
 * Creates a valid SponsorshipMetadata.
 *
 * ```ts
 * const metadata = sponsorship({
 *   name: 'PayPal',
 * });
 * ```
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function sponsorship({ id = v4(), ...others }: SponsorshipOptions): SponsorshipMetadata {
  return evaluate(
    SponsorshipMetadataSchema.safeParse({
      $schema: SponsorshipMetadataSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
