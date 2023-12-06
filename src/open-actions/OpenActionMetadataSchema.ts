import { z } from 'zod';
import { nonEmptyStringSchema, markdownSchema, Markdown } from '../primitives';
import { OpenActionSchemaId } from './OpenActionSchemaId';
import { EventParameterSchema, EventParameter } from './EventParameterSchema';
import { StringAttributeSchema, StringAttribute } from '../MetadataAttribute';

/**
 * The metadata standard for Open Actions
 */
export type OpenActionMetadata = {
  name: string;
  title: string;
  description: Markdown;
  authors: string[];
  initializeABI: EventParameter[];
  processABI: EventParameter[];
  attributes: StringAttribute[];
  $schema: OpenActionSchemaId.LATEST;
};

export const OpenActionMetadataSchema: z.ZodType<OpenActionMetadata, z.ZodTypeDef, object> =
  z.object({
    name: nonEmptyStringSchema('The name of the Open Action.').max(200),
    title: nonEmptyStringSchema(
      'The title of the Open Action. Best to be in a human friendly format.',
    ),
    description: markdownSchema('Markdown formatted description of the open action.'),
    authors: z
      .array(z.string().min(1).email('Authors list should only contain valid emails'))
      .min(1, 'You must supply at least one author'),
    initializeABI: z.array(EventParameterSchema),
    processABI: z.array(EventParameterSchema),
    attributes: z.array(StringAttributeSchema),
    $schema: z.literal(OpenActionSchemaId.LATEST),
  });
