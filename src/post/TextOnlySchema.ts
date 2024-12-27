import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import { PostMetadataCommon, mainContentFocus, metadataDetailsWith, postWith } from './common';
import { Markdown, Signature, MarkdownSchema } from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

export type TextOnlyMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.TEXT_ONLY;
  /**
   * The content for the post as markdown.
   */
  content: Markdown;
};

const TextOnlyMetadataDetailsSchema: z.ZodType<TextOnlyMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.TEXT_ONLY),

    content: MarkdownSchema,
  });

/**
 * Use this for a text-only post.
 *
 * Most comments will fall into this category.
 */
export type TextOnlyMetadata = NftMetadata & {
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
