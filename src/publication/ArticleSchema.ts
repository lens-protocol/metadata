import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  markdown,
  metadataDetailsWith,
  publicationWith,
} from './common';

export const ArticleSchema = publicationWith({
  $schema: z.literal(SchemaId.ARTICLE),

  lens: metadataDetailsWith({
    content: markdown('The content for the publication.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.ARTICLE),

    title: z.string().optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('Any attachment you want to include with it.'),
  }),
});
export type Article = z.infer<typeof ArticleSchema>;
