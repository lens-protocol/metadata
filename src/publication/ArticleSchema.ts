import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import { AnyMediaSchema, ContentSchema, metadataDetailsWith, publicationWith } from './common';

export const ArticleSchema = publicationWith({
  $schema: z.literal(SchemaId.ARTICLE),

  lens: metadataDetailsWith({
    content: ContentSchema.describe('The content for the publication'),

    mainContentFocus: z.literal(PublicationMainFocus.ARTICLE, {
      description: 'The main focus of the publication',
    }),

    title: z.string().optional(),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('Any attachment you want to include with it'),
  }),
});
export type Article = z.infer<typeof ArticleSchema>;
