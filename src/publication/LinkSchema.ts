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

export const LinkSchema = publicationWith({
  $schema: z.literal(SchemaId.LINK),

  lens: metadataDetailsWith({
    sharingLink: uri('The sharing link url.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.LINK),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Link = z.infer<typeof LinkSchema>;
