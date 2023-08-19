import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { markdown } from '../primitives.js';

/**
 * @internal
 */
export const TextOnlySchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.TEXT_ONLY_LATEST),

  lens: metadataDetailsWith({
    content: markdown('The content for the publication as markdown.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.TEXT_ONLY),
  }),
});
export type TextOnlyMetadata = z.infer<typeof TextOnlySchema>;
