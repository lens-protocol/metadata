import { v4 } from 'uuid';

import {
  type ActionMetadata,
  type ActionMetadataDetails,
  ActionMetadataSchema,
  ActionMetadataSchemaId,
} from '../action/index.js';
import type { Prettify } from '../utils.js';
import { evaluate } from './ValidationError';
import type { RecursiveUnbrand } from './utils';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ActionDetails = Prettify<RecursiveUnbrand<Omit<ActionMetadataDetails, 'id'>>>;

export type ActionOptions = ActionDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};

/**
 * Creates a valid ActionMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = action({
 *   name: 'MyPostAction',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   source: 'https://github.com/foobarbaz/my-open-action',
 *   executeParams: [
 *     {
 *       key: '83b03721c31435de384ca9cc3799cdfa10e19123e6a48dbf11589e36a0ef0b95',
 *       name: 'recipient',
 *       type: 'address',
 *     },
 *     {
 *       key: 'e4ddce99520beb836fc879fc2a7d0743f784ffb925f96544bb5ff27c441c8c99',
 *       name: 'amount',
 *       type: 'address token, uint256 value',
 *     }
 *   ]
 * });
 * ```
 */
export function action({ id = v4(), ...others }: ActionOptions): ActionMetadata {
  return evaluate(
    ActionMetadataSchema.safeParse({
      $schema: ActionMetadataSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
