import { z } from 'zod';

import { OpenActionSchemaId } from './OpenActionSchemaId';
import { MetadataAttribute, MetadataAttributeSchema } from '../MetadataAttribute';
import { nonEmptyStringSchema, Markdown, markdown, nonEmpty } from '../primitives';

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
 * The metadata standard for Open Actions
 */
export type OpenActionMetadata = {
  /**
   * The name of the Open Action module.
   */
  name: string;
  /**
   * The human-friendly title of the Open Action module.
   */
  title: string;
  /**
   * Markdown formatted description of the Open Action.
   *
   * It should explain what this module does, how to use it, examples just
   * like you would if you were building an NPM package.
   * The more detail the better to allow dApp to easily integrate it.
   */
  description: Markdown;
  /**
   * List of authors of the Open Action module.
   */
  authors: string[];
  /**
   * The ABI as JSON-string describing the initialization function input(s).
   *
   * This will be used to encode the input data for the initialization function.
   *
   * It will also be used by the consumers of this Open Action to decode
   * the input data for the initialization function so to infer the
   * initializations criteria.
   */
  initializeCalldataABI: string;
  /**
   * The ABI as JSON-string describing the initialization result data.
   *
   * This will be used by the consumers of this Open Action to decode
   * the result data from the initialization function so to infer the
   * initializations result.
   */
  initializeResultDataABI?: string;
  /**
   * The ABI as JSON-string describing the process function input(s).
   *
   * This will be used to encode the input data for the process function.
   */
  processCalldataABI: string;
  /**
   * An arbitrary bag of attributes you wish to add to the Open Action metadata.
   */
  attributes: MetadataAttribute[];
  /**
   * The schema ID of the Open Action.
   */
  $schema: OpenActionSchemaId.LATEST;
};

export const OpenActionMetadataSchema: z.ZodType<OpenActionMetadata, z.ZodTypeDef, object> =
  z.object({
    name: nonEmpty(z.string().max(200)).describe('The name of the Open Action module.'),
    title: nonEmptyStringSchema('The human-friendly title of the Open Action module'),
    description: markdown(
      nonEmptyStringSchema('Markdown formatted description of the open action.'),
    ),
    authors: z
      .array(z.string().email('Authors list should only contain valid emails'))
      .min(1, 'You must supply at least one author')
      .describe('List of authors of the Open Action module.'),
    initializeCalldataABI: jsonString(
      'The ABI as JSON-string describing the initialization function input(s).',
    ),
    initializeResultDataABI: jsonString(
      'The ABI as JSON-string describing the initialization result data.',
    ).optional(),
    processCalldataABI: jsonString(
      'The ABI as JSON-string describing the process function input(s).',
    ),
    attributes: z.array(MetadataAttributeSchema).describe('An arbitrary bag of attributes.'),
    $schema: z.literal(OpenActionSchemaId.LATEST),
  });
