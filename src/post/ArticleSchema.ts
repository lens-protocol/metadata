import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';
import {
  EncryptableMarkdown,
  Signature,
  EncryptableMarkdownSchema,
  NonEmptyStringSchema,
} from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

export type ArticleMetadataDetails = PostMetadataCommon & {
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
 * Use this model an article-like post (e.g. blog, news, etc.)
 */
export type ArticleMetadata = NftMetadata & {
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
