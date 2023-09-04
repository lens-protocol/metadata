import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { uriSchema } from '../primitives.js';

/**
 * @internal
 */
export const EmbedSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.EMBED_LATEST),

  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.EMBED),

    embed: uriSchema('The embed URL.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type EmbedMetadata = z.infer<typeof EmbedSchema>;
