import { z } from 'zod';

import { EventParameterSchema, EventParameter } from './EventParameterSchema';
import { OpenActionSchemaId } from './OpenActionSchemaId';
import { MetadataAttribute, MetadataAttributeSchema } from '../MetadataAttribute';
import { nonEmptyStringSchema, Markdown, markdown } from '../primitives';

/**
 * The metadata standard for Open Actions
 */
export type OpenActionMetadata = {
  /**
   * The name of the Open Action.
   */
  name: string;
  /**
   * The title of the Open Action. Best to be in a human friendly format.
   */
  title: string;
  /**
   * Markdown formatted description of the open action.
   */
  description: Markdown;
  /**
   * The authors of the Open Action.
   */
  authors: string[];
  /**
   * The ABI describing the initialization function.
   */
  initializeABI: EventParameter[];
  /**
   * The ABI describing the processing function.
   */
  processABI: EventParameter[];
  /**
   * The attributes of the Open Action.
   */
  attributes: MetadataAttribute[];
  /**
   * The schema ID of the Open Action.
   */
  $schema: OpenActionSchemaId.LATEST;
};

export const OpenActionMetadataSchema: z.ZodType<OpenActionMetadata, z.ZodTypeDef, object> =
  z.object({
    name: nonEmptyStringSchema('The name of the Open Action.').max(200),
    title: nonEmptyStringSchema(
      'The title of the Open Action. Best to be in a human friendly format.',
    ),
    description: markdown(
      nonEmptyStringSchema('Markdown formatted description of the open action.'),
    ),
    authors: z
      .array(z.string().min(1).email('Authors list should only contain valid emails'))
      .min(1, 'You must supply at least one author'),
    initializeABI: z.array(EventParameterSchema),
    processABI: z.array(EventParameterSchema),
    attributes: z.array(MetadataAttributeSchema),
    $schema: z.literal(OpenActionSchemaId.LATEST),
  });
