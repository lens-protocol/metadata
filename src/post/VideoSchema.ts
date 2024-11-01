import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MediaVideo,
  MediaVideoSchema,
  PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';
import { NftMetadata } from '../tokens/eip721.js';
import {
  EncryptableMarkdown,
  Signature,
  NonEmptyStringSchema,
  EncryptableMarkdownSchema,
} from '../primitives.js';

export type VideoMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.VIDEO | PostMainFocus.SHORT_VIDEO;
  /**
   * The video.
   */
  video: MediaVideo;
  /**
   * The optional video title.
   */
  title?: string;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const VideoMetadataDetailsSchema: z.ZodType<VideoMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.SHORT_VIDEO, PostMainFocus.VIDEO),

    video: MediaVideoSchema,

    title: NonEmptyStringSchema.describe('The optional video title.').optional(),

    content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to model a post where a video is the main focus.
 *
 * Use the `lens.attachments` to include more media.
 */
export type VideoMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.VIDEO_LATEST;
  /**
   * The metadata details.
   */
  lens: VideoMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const VideoSchema = postWith({
  $schema: z.literal(PostSchemaId.VIDEO_LATEST),
  lens: VideoMetadataDetailsSchema,
});
