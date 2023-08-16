import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import { markdown, metadataDetailsWith, publicationWith } from './common/index.js';

export const TextOnlySchema = publicationWith({
  $schema: z.literal(SchemaId.TEXT_ONLY),

  lens: metadataDetailsWith({
    content: markdown('The content for the publication.'),

    mainContentFocus: z.literal(PublicationMainFocus.TEXT_ONLY, {
      description: 'The main focus of the publication.',
    }),
  }),
});
export type TextOnly = z.infer<typeof TextOnlySchema>;
