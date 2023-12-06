import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MarketplaceMetadata,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import {
  EncryptableMarkdown,
  Signature,
  encryptableMarkdownSchema,
  nonEmptyStringSchema,
} from '../primitives.js';

export type ArticleMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.ARTICLE;
  /**
   * Markdown content.
   */
  content: EncryptableMarkdown;
  /**
   * The optional article title.
   */
  title?: string;
  /**
   * Any attachment you want to include with it.
   */
  attachments?: AnyMedia[];
};
const ArticleMetadataDetailsSchema: z.ZodType<ArticleMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.ARTICLE),

    content: encryptableMarkdownSchema('The content for the publication as markdown.'),

    title: nonEmptyStringSchema('The optional article title.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('Any attachment you want to include with it.'),
  });

/**
 * Use this model an article-like publication (e.g. blog, news, etc.)
 */
export type ArticleMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.ARTICLE_LATEST;
  /**
   * The metadata details.
   */
  lens: ArticleMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   *
   * @experimental DO NOT use yet
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const ArticleSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.ARTICLE_LATEST),
  lens: ArticleMetadataDetailsSchema,
});
