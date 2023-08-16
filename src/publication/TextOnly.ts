import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import { ContentSchema, metadataDetailsWith, publicationWith } from './common';

export const TextOnlySchema = publicationWith({
  $schema: z.literal(SchemaId.TEXT_ONLY),

  lens: metadataDetailsWith({
    content: ContentSchema.describe('The content for the publication'),

    mainContentFocus: z.literal(PublicationMainFocus.TEXT_ONLY, {
      description: 'The main focus of the publication',
    }),
  }),
});
export type TextOnly = z.infer<typeof TextOnlySchema>;
