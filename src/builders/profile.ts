import { v4 } from 'uuid';

import { evaluate } from './ValidationError';
import { RecursiveUnbrand } from './utils';
import {
  ProfileMetadata,
  ProfileMetadataDetails,
  ProfileMetadataSchema,
  ProfileSchemaId,
} from '../profile';
import { Prettify } from '../utils.js';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ProfileDetails = Prettify<RecursiveUnbrand<Omit<ProfileMetadataDetails, 'id'>>>;
/**
 * All {@link ProfileMetadataDetails} fields with:
 */
export type ProfileOptions = ProfileDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};
/**
 * Creates a valid ProfileMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * Global profile (no `appId`):
 * ```ts
 * const metadata = profile({
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
 * App specific profile (with `appId`):
 * ```ts
 * const metadata = profile({
 *   appId: 'com.example.app',
 *   name: 'John Doe',
 * });
 * ```
 *
 * @example
 * With attributes:
 * ```ts
 * const metadata = profile({
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
export function profile({ id = v4(), ...others }: ProfileOptions): ProfileMetadata {
  return evaluate(
    ProfileMetadataSchema.safeParse({
      $schema: ProfileSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
