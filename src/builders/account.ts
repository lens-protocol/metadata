import { v4 } from 'uuid';

import { evaluate } from './ValidationError';
import { RecursiveUnbrand } from './utils';
import {
  AccountMetadata,
  AccountMetadataDetails,
  AccountMetadataSchema,
  AccountSchemaId,
} from '../account';
import { Prettify } from '../utils.js';

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
 * Global Account (no `appId`):
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
 * App specific Account (with `appId`):
 * ```ts
 * const metadata = account({
 *   appId: 'com.example.app',
 *   name: 'John Doe',
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
 *       value: 'https://twitter.com/johndoe',
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
      $schema: AccountSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}