import { v4 } from 'uuid';

import {
  type AccountMetadata,
  type AccountMetadataDetails,
  AccountMetadataSchema,
  AccountMetadataSchemaId,
} from '../account';
import type { Prettify } from '../utils.js';
import { evaluate } from './ValidationError.js';
import type { RecursiveUnbrand } from './utils.js';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type AccountDetails = Prettify<RecursiveUnbrand<Omit<AccountMetadataDetails, 'id'>>>;
/**
 * All {@link AccountMetadataDetails} fields with:
 */
export type AccountOptions = AccountDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};
/**
 * Creates a valid AccountMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = account({
 *   name: 'John Doe',
 *   bio: `
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.
 *
 *   - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *   - Donec a diam lectus.
 *   `,
 * });
 * ```
 *
 * @example
 * With attributes:
 * ```ts
 * const metadata = account({
 *   name: 'John Doe',
 *   picture: 'https://example.com/picture.png',
 *   attributes: [
 *     {
 *       key: 'twitter',
 *       type: MetadataAttributeType.STRING,
 *       value: 'https://x.com/johndoe',
 *     },
 *     {
 *       key: 'dob',
 *       type: MetadataAttributeType.DATE,
 *       value: '1990-01-01T00:00:00Z',
 *     },
 *     {
 *       key: 'enabled',
 *       type: MetadataAttributeType.BOOLEAN,
 *       value: 'true',
 *     },
 *     {
 *       key: 'height',
 *       type: MetadataAttributeType.NUMBER,
 *       value: '1.8',
 *     },
 *     {
 *       key: 'settings',
 *       type: MetadataAttributeType.JSON,
 *       value: '{"theme": "dark"}',
 *     },
 *   ],
 * });
 * ```
 */
export function account({ id = v4(), ...others }: AccountOptions): AccountMetadata {
  return evaluate(
    AccountMetadataSchema.safeParse({
      $schema: AccountMetadataSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
