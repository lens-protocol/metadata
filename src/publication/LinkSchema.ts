import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import { AnyMediaSchema, metadataDetailsWith, publicationWith, uri } from './common/index.js';

export const LinkSchema = publicationWith({
  $schema: z.literal(SchemaId.LINK),

  lens: metadataDetailsWith({
    sharingLink: uri('The sharing link url.'),

    mainContentFocus: z.literal(PublicationMainFocus.LINK, {
      description: 'The main focus of the publication.',
    }),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Link = z.infer<typeof LinkSchema>;
