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

export type FollowRuleMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * A short name for the Rule.
   */
  name: string;
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
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `configure` function.
   *
   * ```sol
   * function configure(bytes32 configSalt, address account, KeyValue[] calldata ruleParams) external;
   * ```
   *
   * This will be used to know how to encode and decode the params for the `configure` function.
   *
   * @see https://abitype.dev/api/human
   */
  configureParams: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processFollow` function.
   *
   * ```sol
   * function processFollow(
   *   bytes32 configSalt,
   *   address originalMsgSender,
   *   address followerAccount,
   *   address accountToFollow,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode and decode the params for the `processFollow` function.
   *
   * @see https://abitype.dev/api/human
   */
  processFollowParams: ContractKeyValuePairDescriptor[];
};

const FollowRuleMetadataDetailsSchema: z.ZodType<FollowRuleMetadataDetails, z.ZodTypeDef, object> =
  z.object({
    id: NonEmptyStringSchema.describe(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),
    name: NonEmptyStringSchema.describe('A short name for the Rule.'),
    description: MarkdownSchema.describe('Markdown formatted description of the Rule.'),
    authors: z
      .array(z.string().email('Authors list should only contain valid emails'))
      .min(1, 'You must supply at least one author')
      .describe('List of authors email addresses.'),
    source: URISchema.describe('The link to the Rule source code. Typically a GitHub repository.'),
    configureParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `configure` function.',
      ),
    processFollowParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processFollow` function.',
      ),
  });

export type FollowRuleMetadata = {
  $schema: RuleMetadataSchemaId.FOLLOW_LATEST;
  lens: FollowRuleMetadataDetails;
  signature?: Signature;
};

export const FollowRuleMetadataSchema = rootSchema({
  $schema: z.literal(RuleMetadataSchemaId.FOLLOW_LATEST),
  lens: FollowRuleMetadataDetailsSchema,
});
