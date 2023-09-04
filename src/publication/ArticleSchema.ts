import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { markdownSchema, notEmptyString } from '../primitives.js';

/**
 * @internal
 */
export const ArticleSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.ARTICLE_LATEST),

  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.ARTICLE),

    content: markdownSchema('The content for the publication as markdown.'),

    title: notEmptyString('The optional article title.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('Any attachment you want to include with it.'),
  }),
});
export type ArticleMetadata = z.infer<typeof ArticleSchema>;
