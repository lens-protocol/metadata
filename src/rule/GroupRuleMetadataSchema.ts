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

export type GroupRuleMetadataDetails = {
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
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processAddition` function.
   *
   * ```sol
   * function processAddition(
   *   bytes32 configSalt,
   *   address originalMsgSender,
   *   address account,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode and decode the params for the `processAddition` function.
   *
   * @see https://abitype.dev/api/human
   */
  processAdditionParams: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processRemoval` function.
   *
   * ```sol
   * function processRemoval(
   *   bytes32 configSalt,
   *   address originalMsgSender,
   *   address account,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode the calldata for the `processRemoval` function.
   *
   * @see https://abitype.dev/api/human
   */
  processRemovalParams: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processJoining` function.
   *
   * ```sol
   * function processJoining(
   *   bytes32 configSalt,
   *   address account,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode the calldata for the `processJoining` function.
   *
   * @see https://abitype.dev/api/human
   */
  processJoiningParams: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processLeaving` function.
   *
   * ```sol
   * function processLeaving(
   *   bytes32 configSalt,
   *   address account,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode the calldata for the `processLeaving` function.
   *
   * @see https://abitype.dev/api/human
   */
  processLeavingParams: ContractKeyValuePairDescriptor[];
};

const GroupRuleMetadataDetailsSchema: z.ZodType<GroupRuleMetadataDetails, z.ZodTypeDef, object> =
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
    processAdditionParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processAddition` function.',
      ),
    processRemovalParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processRemoval` function.',
      ),
    processJoiningParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processJoining` function.',
      ),
    processLeavingParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processLeaving` function.',
      ),
  });

export type GroupRuleMetadata = {
  $schema: RuleMetadataSchemaId.GROUP_LATEST;
  lens: GroupRuleMetadataDetails;
  signature?: Signature;
};

export const GroupRuleMetadataSchema = rootSchema({
  $schema: z.literal(RuleMetadataSchemaId.GROUP_LATEST),
  lens: GroupRuleMetadataDetailsSchema,
});
