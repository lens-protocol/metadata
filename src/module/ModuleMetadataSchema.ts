import { z } from 'zod';

import { ModuleSchemaId } from './ModuleSchemaId';
import { MetadataAttribute, MetadataAttributeSchema } from '../MetadataAttribute';
import { Markdown, nonEmptySchema, NonEmptyStringSchema, MarkdownSchema } from '../primitives';

function isValidJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function jsonString(description: string) {
  return z.string({ description }).refine(isValidJsonString, { message: 'Invalid JSON string' });
}

/**
 * The metadata standard for Lens Modules
 */
export type ModuleMetadata = {
  /**
   * The name of the module.
   */
  name: string;
  /**
   * The human-friendly title for the module.
   */
  title: string;
  /**
   * Markdown formatted description of the module.
   *
   * It should explain what this module does, how to use it, examples just
   * like you would if you were building an NPM package.
   * The more detail the better to allow dApp to easily integrate it.
   */
  description: Markdown;
  /**
   * List of authors email addresses.
   */
  authors: string[];
  /**
   * The Solidity JSON ABI as JSON-string describing the initialization function calldata.
   *
   * This will be used to encode the calldata for the initialization function.
   *
   * It will also be used by the consumers of this module to decode the initialization
   * calldata so to infer the initialization criteria.
   */
  initializeCalldataABI: string;
  /**
   * The Solidity JSON ABI as JSON-string describing the initialization result data.
   *
   * This will be used by the consumers of this module to decode
   * the result data from the initialization function so to infer the
   * initialization result state.
   */
  initializeResultDataABI?: string;
  /**
   * The Solidity JSON ABI as JSON-string describing the process function calldata.
   *
   * This will be used to encode the calldata for the process function.
   *
   * Some modules might non need to return any initialization result data.
   */
  processCalldataABI: string;
  /**
   * An arbitrary bag of attributes you wish to add to the metadata.
   */
  attributes: MetadataAttribute[];
  /**
   * The schema ID.
   */
  $schema: ModuleSchemaId.LATEST;
};

export const ModuleMetadataSchema: z.ZodType<ModuleMetadata, z.ZodTypeDef, object> = z.object({
  name: nonEmptySchema(z.string().max(200)).describe('The name of the module.'),
  title: NonEmptyStringSchema.describe('The human-friendly title for the module.'),
  description: MarkdownSchema.describe('Markdown formatted description of the module.'),
  authors: z
    .array(z.string().email('Authors list should only contain valid emails'))
    .min(1, 'You must supply at least one author')
    .describe('List of authors email addresses.'),
  initializeCalldataABI: jsonString(
    'The Solidity JSON ABI as JSON-string describing the initialization function calldata.',
  ),
  initializeResultDataABI: jsonString(
    'The Solidity JSON ABI as JSON-string describing the initialization result data.',
  ).optional(),
  processCalldataABI: jsonString(
    'The Solidity JSON ABI as JSON-string describing the process function calldata.',
  ),
  attributes: z.array(MetadataAttributeSchema).describe('An arbitrary bag of attributes.'),
  $schema: z.literal(ModuleSchemaId.LATEST),
});
