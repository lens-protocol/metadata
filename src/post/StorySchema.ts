import { z } from 'zod';

import { type Markdown, MarkdownSchema, type Signature } from '../primitives.js';
import type { NftMetadata } from '../tokens/eip721.js';
import { PostMainFocus } from './PostMainFocus.js';
import { PostMetadataSchemaId } from './PostMetadataSchemaId.js';
import {
  type AnyMedia,
  AnyMediaSchema,
  type PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';

export type StoryMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.STORY;
  /**
   * The story asset.
   */
  asset: AnyMedia;
  /**
   * Optional markdown content.
   */
  content?: Markdown;
};

const StoryMetadataDetailsSchema: z.ZodType<StoryMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.STORY),

    asset: AnyMediaSchema.describe('The story asset.'),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),
  });

/**
 * Use this to model an Instagram-like story.
 */
export type StoryMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostMetadataSchemaId.STORY_LATEST;
  /**
   * The metadata details.
   */
  lens: StoryMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const StorySchema = postWith({
  $schema: z.literal(PostMetadataSchemaId.STORY_LATEST),
  lens: StoryMetadataDetailsSchema,
});
