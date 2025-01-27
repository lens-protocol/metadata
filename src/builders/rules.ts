import { v4 } from 'uuid';

import {
  type FeedRuleMetadata,
  type FeedRuleMetadataDetails,
  FeedRuleMetadataSchema,
} from '../rule/FeedRuleMetadataSchema.js';
import {
  type FollowRuleMetadata,
  type FollowRuleMetadataDetails,
  FollowRuleMetadataSchema,
} from '../rule/FollowRuleMetadataSchema.js';
import {
  type GraphRuleMetadata,
  type GraphRuleMetadataDetails,
  GraphRuleMetadataSchema,
} from '../rule/GraphRuleMetadataSchema.js';
import {
  type GroupRuleMetadata,
  type GroupRuleMetadataDetails,
  GroupRuleMetadataSchema,
} from '../rule/GroupRuleMetadataSchema.js';
import {
  type NamespaceRuleMetadata,
  type NamespaceRuleMetadataDetails,
  NamespaceRuleMetadataSchema,
} from '../rule/NamespaceRuleMetadataSchema.js';
import {
  type PostRuleMetadata,
  type PostRuleMetadataDetails,
  PostRuleMetadataSchema,
} from '../rule/PostRuleMetadataSchema.js';
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
 *   configureParams: [],
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
 *   configureParams: [],
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

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type GroupRuleDetails = Prettify<RecursiveUnbrand<Omit<GroupRuleMetadataDetails, 'id'>>>;

export type GroupRuleOptions = GroupRuleDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};

/**
 * Creates a valid GroupRuleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = groupRule({
 *   name: 'MyGroupRule',
 *   title: 'This is my Group Rule',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   source: 'https://github.com/foobarbaz/my-open-action',
 *   configureParams: [],
 *   processAdditionParams: [],
 *   processRemovalParams: [],
 *   processJoiningParams: [
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
 *   processLeavingParams: [],
 * });
 * ```
 */
export function groupRule({ id = v4(), ...others }: GroupRuleOptions): GroupRuleMetadata {
  return evaluate(
    GroupRuleMetadataSchema.safeParse({
      $schema: RuleMetadataSchemaId.GROUP_LATEST,
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
type NamespaceRuleDetails = Prettify<RecursiveUnbrand<Omit<NamespaceRuleMetadataDetails, 'id'>>>;

export type NamespaceRuleOptions = NamespaceRuleDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};

/**
 * Creates a valid NamespaceRuleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = namespaceRule({
 *   name: 'MyNamespaceRule',
 *   title: 'This is my Namespace Rule',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   source: 'https://github.com/foobarbaz/my-open-action',
 *   configureParams: [],
 *   processCreationParams: [
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
 *   processRemovalParams: [],
 *   processAssigningParams: [],
 *   processUnassigningParams: [],
 * });
 * ```
 */
export function namespaceRule({
  id = v4(),
  ...others
}: NamespaceRuleOptions): NamespaceRuleMetadata {
  return evaluate(
    NamespaceRuleMetadataSchema.safeParse({
      $schema: RuleMetadataSchemaId.NAMESPACE_LATEST,
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
type PostRuleDetails = Prettify<RecursiveUnbrand<Omit<PostRuleMetadataDetails, 'id'>>>;

export type PostRuleOptions = PostRuleDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};

/**
 * Creates a valid PostRuleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = postRule({
 *   name: 'MyPostRule',
 *   title: 'This is my Post Rule',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   source: 'https://github.com/foobarbaz/my-open-action',
 *   configureParams: [],
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
 * });
 * ```
 */
export function postRule({ id = v4(), ...others }: PostRuleOptions): PostRuleMetadata {
  return evaluate(
    PostRuleMetadataSchema.safeParse({
      $schema: RuleMetadataSchemaId.POST_LATEST,
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
type FollowRuleDetails = Prettify<RecursiveUnbrand<Omit<FollowRuleMetadataDetails, 'id'>>>;

export type FollowRuleOptions = FollowRuleDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};

/**
 * Creates a valid FollowRuleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = followRule({
 *   name: 'MyFollowRule',
 *   title: 'This is my Follow Rule',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   source: 'https://github.com/foobarbaz/my-open-action',
 *   configureParams: [],
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
 * });
 * ```
 */
export function followRule({ id = v4(), ...others }: FollowRuleOptions): FollowRuleMetadata {
  return evaluate(
    FollowRuleMetadataSchema.safeParse({
      $schema: RuleMetadataSchemaId.POST_LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
