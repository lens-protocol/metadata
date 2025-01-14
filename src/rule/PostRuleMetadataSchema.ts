import { z } from 'zod';

import { rootSchema } from '../common';
import {
  type ContractKeyValuePairDescriptor,
  ContractKeyValuePairDescriptorSchema,
  type Markdown,
  MarkdownSchema,
  NonEmptyStringSchema,
  type Signature,
  type URI,
  URISchema,
} from '../primitives';
import { RuleMetadataSchemaId } from './RuleMetadataSchemaId';

export type PostRuleMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * A short name for the Rule.
   */
  name: string;
  /**
   * The human-friendly title for the Rule.
   */
  title: string;
  /**
   * Markdown formatted description of the Rule.
   *
   * It should explain what this Rule does, how to use it, examples just
   * like you would if you were building an NPM package.
   * The more detail the better to allow dApp to easily integrate it.
   */
  description: Markdown;
  /**
   * List of authors email addresses.
   */
  authors: string[];
  /**
   * The link to the Rule source code. Typically a GitHub repository.
   */
  source: URI;
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processCreatePost` function.
   *
   * ```sol
   * function processCreatePost(
   *   bytes32 configSalt,
   *   uint256 rootPostId,
   *   uint256 postId,
   *   CreatePostParams calldata postParams,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode and decode the params for the `processCreatePost` function.
   *
   * @see https://abitype.dev/api/human
   */
  processCreatePostParams: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processEditPost` function.
   *
   * ```sol
   * function processEditPost(
   *   bytes32 configSalt,
   *   uint256 rootPostId,
   *   uint256 postId,
   *   EditPostParams calldata postParams,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode the calldata for the `processEditPost` function.
   *
   * @see https://abitype.dev/api/human
   */
  processEditPostParams: ContractKeyValuePairDescriptor[];
};

const PostRuleMetadataDetailsSchema: z.ZodType<PostRuleMetadataDetails, z.ZodTypeDef, object> =
  z.object({
    id: NonEmptyStringSchema.describe(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),
    name: NonEmptyStringSchema.describe('A short name for the Rule.'),
    title: NonEmptyStringSchema.describe('The human-friendly title for the Rule.'),
    description: MarkdownSchema.describe('Markdown formatted description of the Rule.'),
    authors: z
      .array(z.string().email('Authors list should only contain valid emails'))
      .min(1, 'You must supply at least one author')
      .describe('List of authors email addresses.'),
    source: URISchema.describe('The link to the Rule source code. Typically a GitHub repository.'),
    processCreatePostParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processCreatePost` function.',
      ),
    processEditPostParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processEditPost` function.',
      ),
  });

export type PostRuleMetadata = {
  $schema: RuleMetadataSchemaId.POST_LATEST;
  lens: PostRuleMetadataDetails;
  signature?: Signature;
};

export const PostRuleMetadataSchema = rootSchema({
  $schema: z.literal(RuleMetadataSchemaId.POST_LATEST),
  lens: PostRuleMetadataDetailsSchema,
});
