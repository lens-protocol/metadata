import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  markdown,
  metadataDetailsWith,
  notEmptyString,
  publicationWith,
} from './common';

/**
 * @internal
 */
export const ArticleSchema = publicationWith({
  $schema: z.literal(SchemaId.ARTICLE),

  lens: metadataDetailsWith({
    content: markdown('The content for the publication.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.ARTICLE),

    title: notEmptyString('The optional article title.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('Any attachment you want to include with it.'),
  }),
});
export type ArticleMetadata = z.infer<typeof ArticleSchema>;
