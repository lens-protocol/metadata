import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { uri } from '../primitives.js';

/**
 * @internal
 */
export const LinkSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.LINK_LATEST),

  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.LINK),

    sharingLink: uri('The sharing link url.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type LinkMetadata = z.infer<typeof LinkSchema>;
