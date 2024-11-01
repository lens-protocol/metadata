import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import { PostMetadataCommon, mainContentFocus, metadataDetailsWith, postWith } from './common';
import { MarketplaceMetadata } from '../tokens/eip721.js';
import { EncryptableMarkdown, Signature, EncryptableMarkdownSchema } from '../primitives.js';

export type TextOnlyMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.TEXT_ONLY;
  /**
   * The content for the post as markdown.
   */
  content: EncryptableMarkdown;
};

const TextOnlyMetadataDetailsSchema: z.ZodType<TextOnlyMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.TEXT_ONLY),

    content: EncryptableMarkdownSchema,
  });

/**
 * Use this for a text-only post.
 *
 * Most comments will fall into this category.
 */
export type TextOnlyMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.TEXT_ONLY_LATEST;
  /**
   * The metadata details.
   */
  lens: TextOnlyMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const TextOnlySchema = postWith({
  $schema: z.literal(PostSchemaId.TEXT_ONLY_LATEST),
  lens: TextOnlyMetadataDetailsSchema,
});
