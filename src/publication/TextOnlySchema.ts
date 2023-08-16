import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import { mainContentFocus, markdown, metadataDetailsWith, publicationWith } from './common';

/**
 * @internal
 */
export const TextOnlySchema = publicationWith({
  $schema: z.literal(SchemaId.TEXT_ONLY),

  lens: metadataDetailsWith({
    content: markdown('The content for the publication.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.TEXT_ONLY),
  }),
});
export type TextOnlyMetadata = z.infer<typeof TextOnlySchema>;
