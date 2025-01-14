import { z } from 'zod';
import { type FeedRuleMetadata, FeedRuleMetadataSchema } from './FeedRuleMetadataSchema.js';
import { type GraphRuleMetadata, GraphRuleMetadataSchema } from './GraphRuleMetadataSchema.js';

export * from './RuleMetadataSchemaId.js';
export * from './FeedRuleMetadataSchema.js';

/**
 * @internal
 */
export type RuleMetadata = FeedRuleMetadata | GraphRuleMetadata;

/**
 * @internal
 */
export const RuleMetadataSchema: z.ZodType<RuleMetadata, z.ZodTypeDef, object> =
  z.discriminatedUnion('$schema', [FeedRuleMetadataSchema, GraphRuleMetadataSchema]);
