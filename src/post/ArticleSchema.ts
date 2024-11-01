import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';
import { MarketplaceMetadata } from '../marketplace.js';
import {
  EncryptableMarkdown,
  Signature,
  EncryptableMarkdownSchema,
  NonEmptyStringSchema,
} from '../primitives.js';

export type ArticleMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.ARTICLE;
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
    mainContentFocus: mainContentFocus(PostMainFocus.ARTICLE),

    content: EncryptableMarkdownSchema,

    title: NonEmptyStringSchema.describe('The optional article title.').optional(),

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
  $schema: PostSchemaId.ARTICLE_LATEST;
  /**
   * The metadata details.
   */
  lens: ArticleMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const ArticleSchema = postWith({
  $schema: z.literal(PostSchemaId.ARTICLE_LATEST),
  lens: ArticleMetadataDetailsSchema,
});
