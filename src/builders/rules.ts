import { v4 } from 'uuid';

import {
  type FeedRuleMetadata,
  type FeedRuleMetadataDetails,
  FeedRuleMetadataSchema,
} from '../rule/FeedRuleMetadataSchema.js';
import {
  type GraphRuleMetadata,
  type GraphRuleMetadataDetails,
  GraphRuleMetadataSchema,
} from '../rule/GraphRuleMetadataSchema.js';
import { RuleMetadataSchemaId } from '../rule/RuleMetadataSchemaId.js';
import type { Prettify } from '../utils.js';
import { evaluate } from './ValidationError.js';
import type { RecursiveUnbrand } from './utils.js';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type FeedRuleDetails = Prettify<RecursiveUnbrand<Omit<FeedRuleMetadataDetails, 'id'>>>;

export type FeedRuleOptions = FeedRuleDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};

/**
 * Creates a valid FeedRuleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = feedRule({
 *   name: 'MyFeedRule',
 *   title: 'This is my Feed Rule',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   source: 'https://github.com/foobarbaz/my-open-action',
 *   processCreatePostParams: [
 *     {
 *       key: '83b03721c31435de384ca9cc3799cdfa10e19123e6a48dbf11589e36a0ef0b95',
 *       name: 'recipient',
 *       type: 'address',
 *     },
 *     {
 *       key: 'e4ddce99520beb836fc879fc2a7d0743f784ffb925f96544bb5ff27c441c8c99',
 *       name: 'fee',
 *       type: 'address token, uint256 value',
 *     }
 *   ],
 *   processEditPostParams: [],
 *   processRemovePostParams: [],
 *   processPostRuleChangesParams: [],
 * });
 * ```
 */
export function feedRule({ id = v4(), ...others }: FeedRuleOptions): FeedRuleMetadata {
  return evaluate(
    FeedRuleMetadataSchema.safeParse({
      $schema: RuleMetadataSchemaId.FEED_LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type GraphRuleDetails = Prettify<RecursiveUnbrand<Omit<GraphRuleMetadataDetails, 'id'>>>;

export type GraphRuleOptions = GraphRuleDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};

/**
 * Creates a valid GraphRuleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = graphRule({
 *   name: 'MyGraphRule',
 *   title: 'This is my Graph Rule',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   source: 'https://github.com/foobarbaz/my-open-action',
 *   processFollowParams: [
 *     {
 *       key: '83b03721c31435de384ca9cc3799cdfa10e19123e6a48dbf11589e36a0ef0b95',
 *       name: 'recipient',
 *       type: 'address',
 *     },
 *     {
 *       key: 'e4ddce99520beb836fc879fc2a7d0743f784ffb925f96544bb5ff27c441c8c99',
 *       name: 'fee',
 *       type: 'address token, uint256 value',
 *     }
 *   ],
 *   processUnfollowParams: [],
 *   processFollowRuleChangesParams: [],
 * });
 * ```
 */
export function graphRule({ id = v4(), ...others }: GraphRuleOptions): GraphRuleMetadata {
  return evaluate(
    GraphRuleMetadataSchema.safeParse({
      $schema: RuleMetadataSchemaId.GRAPH_LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
