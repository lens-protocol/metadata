import { z } from 'zod';

import {
  type ContractKeyValuePairDescriptor,
  ContractKeyValuePairDescriptorSchema,
  type Markdown,
  MarkdownSchema,
  NonEmptyStringSchema,
  type Signature,
  SignatureSchema,
  type URI,
  URISchema,
} from '../primitives';
import { ActionMetadataSchemaId } from './ActionMetadataSchemaId';

export type ActionMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The name of the Action.
   */
  name: string;
  /**
   * The human-friendly title for the Action.
   */
  title: string;
  /**
   * Markdown formatted description of the Action.
   *
   * It should explain what this Action does, how to use it, examples just
   * like you would if you were building an NPM package.
   * The more detail the better to allow dApp to easily integrate it.
   */
  description: Markdown;
  /**
   * List of authors email addresses.
   */
  authors: string[];
  /**
   * The link to the Action source code. Typically a GitHub repository.
   */
  source: URI;
  /**
   * An optional list of {@link ContractKeyValuePairDescriptor} that describe the `params` argument of the `configure` function.
   *
   * ```sol
   * function configure(address originalMsgSender, address feed, uint256 postId, KeyValue[] calldata params)
   *   external
   *   returns (bytes memory);
   * ```
   *
   * This will be used to know how to encode and decode the params for the `configuration` function.
   *
   * @see https://abitype.dev/api/human
   */
  configureParams?: ContractKeyValuePairDescriptor[];
  /**
   * A list of {@link ContractKeyValuePairDescriptor} that describe the `params` argument of the `execute` function.
   *
   * ```sol
   * function execute(address originalMsgSender, address feed, uint256 postId, KeyValue[] calldata params)
   *   external
   *   returns (bytes memory);
   * ```
   *
   * This will be used to know how to encode the calldata for the `execute` function.
   */
  executeParams?: ContractKeyValuePairDescriptor[];
  /**
   * An optional list of {@link ContractKeyValuePairDescriptor} that describe the `params` argument of the `setDisabledParams` function.
   *
   * ```sol
   * function setDisabled(
   *   address originalMsgSender,
   *   address feed,
   *   uint256 postId,
   *   bool isDisabled,
   *   KeyValue[] calldata params
   * ) external returns (bytes memory);
   * ```
   *
   * This will be used to know how to encode the calldata for the `setDisabled` function.
   */
  setDisabledParams?: ContractKeyValuePairDescriptor[];
};

const ActionMetadataDetailsSchema: z.ZodType<ActionMetadataDetails, z.ZodTypeDef, object> =
  z.object({
    id: NonEmptyStringSchema.describe(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),
    name: NonEmptyStringSchema.describe('The name of the Action.'),
    title: NonEmptyStringSchema.describe('The human-friendly title for the Action.'),
    description: MarkdownSchema.describe('Markdown formatted description of the Action.'),
    authors: z
      .array(z.string().email('Authors list should only contain valid emails'))
      .min(1, 'You must supply at least one author')
      .describe('List of authors email addresses.'),
    source: URISchema.describe(
      'The link to the Action source code. Typically a GitHub repository.',
    ),
    configureParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .optional()
      .describe(
        'An optional list of `ContractKeyValuePairDescriptor` that describe the `params` argument of the `configure` function.',
      ),
    executeParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .describe(
        'A list of `ContractKeyValuePairDescriptor` that describe the `params` argument of the `execute` function.',
      ),
    setDisabledParams: z
      .array(ContractKeyValuePairDescriptorSchema)
      .optional()
      .describe(
        'An optional list of `ContractKeyValuePairDescriptor` that describe the `params` argument of the `setDisabledParams` function.',
      ),
  });

export type ActionMetadata = {
  $schema: ActionMetadataSchemaId.LATEST;
  lens: ActionMetadataDetails;
  signature?: Signature;
};

export const ActionMetadataSchema: z.ZodType<ActionMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(ActionMetadataSchemaId.LATEST),
  lens: ActionMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
