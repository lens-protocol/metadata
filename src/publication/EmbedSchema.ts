import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
  uri,
} from './common';

/**
 * @internal
 */
export const EmbedSchema = publicationWith({
  $schema: z.literal(SchemaId.EMBED),

  lens: metadataDetailsWith({
    embed: uri('The embed URL.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.EMBED),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type EmbedMetadata = z.infer<typeof EmbedSchema>;
