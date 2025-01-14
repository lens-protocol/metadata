import { z } from 'zod';
import { type FeedRuleMetadata, FeedRuleMetadataSchema } from './FeedRuleMetadataSchema.js';
import { type FollowRuleMetadata, FollowRuleMetadataSchema } from './FollowRuleMetadataSchema.js';
import { type GraphRuleMetadata, GraphRuleMetadataSchema } from './GraphRuleMetadataSchema.js';
import { type GroupRuleMetadata, GroupRuleMetadataSchema } from './GroupRuleMetadataSchema.js';
import {
  type NamespaceRuleMetadata,
  NamespaceRuleMetadataSchema,
} from './NamespaceRuleMetadataSchema.js';
import { type PostRuleMetadata, PostRuleMetadataSchema } from './PostRuleMetadataSchema.js';

export * from './FeedRuleMetadataSchema.js';
export * from './GraphRuleMetadataSchema.js';
export * from './GroupRuleMetadataSchema.js';
export * from './NamespaceRuleMetadataSchema.js';
export * from './RuleMetadataSchemaId.js';

/**
 * @internal
 */
export type RuleMetadata =
  | FeedRuleMetadata
  | FollowRuleMetadata
  | GraphRuleMetadata
  | GroupRuleMetadata
  | NamespaceRuleMetadata
  | PostRuleMetadata;

/**
 * @internal
 */
export const RuleMetadataSchema: z.ZodType<RuleMetadata, z.ZodTypeDef, object> =
  z.discriminatedUnion('$schema', [
    FeedRuleMetadataSchema,
    FollowRuleMetadataSchema,
    GraphRuleMetadataSchema,
    GroupRuleMetadataSchema,
    NamespaceRuleMetadataSchema,
    PostRuleMetadataSchema,
  ]);
