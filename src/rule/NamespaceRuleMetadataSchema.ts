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

export type NamespaceRuleMetadataDetails = {
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
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processCreation` function.
   *
   * ```sol
   * function processCreation(
   *   bytes32 configSalt,
   *   address originalMsgSender,
   *   address account,
   *   string calldata username,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode and decode the params for the `processCreation` function.
   *
   * @see https://abitype.dev/api/human
   */
  processCreationParams: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processRemoval` function.
   *
   * ```sol
   * function processRemoval(
   *   bytes32 configSalt,
   *   address originalMsgSender,
   *   string calldata username,
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
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processAssigning` function.
   *
   * ```sol
   * function processAssigning(
   *   bytes32 configSalt,
   *   address originalMsgSender,
   *   address account,
   *   string calldata username,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode the calldata for the `processAssigning` function.
   *
   * @see https://abitype.dev/api/human
   */
  processAssigningParams: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describes the `ruleParams` argument of the `processUnassigning` function.
   *
   * ```sol
   * function processUnassigning(
   *   bytes32 configSalt,
   *   address originalMsgSender,
   *   address account,
   *   string calldata username,
   *   KeyValue[] calldata primitiveParams,
   *   KeyValue[] calldata ruleParams
   * ) external;
   * ```
   *
   * This will be used to know how to encode the calldata for the `processUnassigning` function.
   *
   * @see https://abitype.dev/api/human
   */
  processUnassigningParams: ContractKeyValuePairDescriptor[];
};

const NamespaceRuleMetadataDetailsSchema: z.ZodType<
  NamespaceRuleMetadataDetails,
  z.ZodTypeDef,
  object
> = z.object({
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
  processCreationParams: z
    .array(ContractKeyValuePairDescriptorSchema)
    .describe(
      'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processCreation` function.',
    ),
  processRemovalParams: z
    .array(ContractKeyValuePairDescriptorSchema)
    .describe(
      'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processRemoval` function.',
    ),
  processAssigningParams: z
    .array(ContractKeyValuePairDescriptorSchema)
    .describe(
      'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processAssigning` function.',
    ),
  processUnassigningParams: z
    .array(ContractKeyValuePairDescriptorSchema)
    .describe(
      'A list of `ContractKeyValuePairDescriptor` that describes the `ruleParams` argument of the `processUnassigning` function.',
    ),
});

export type NamespaceRuleMetadata = {
  $schema: RuleMetadataSchemaId.NAMESPACE_LATEST;
  lens: NamespaceRuleMetadataDetails;
  signature?: Signature;
};

export const NamespaceRuleMetadataSchema = rootSchema({
  $schema: z.literal(RuleMetadataSchemaId.NAMESPACE_LATEST),
  lens: NamespaceRuleMetadataDetailsSchema,
});
