import { z } from 'zod';

import {
  type Markdown,
  MarkdownSchema,
  NonEmptyStringSchema,
  type Signature,
} from '../primitives.js';
import type { NftMetadata } from '../tokens/eip721.js';
import { PostMainFocus } from './PostMainFocus.js';
import { PostMetadataSchemaId } from './PostMetadataSchemaId.js';
import {
  type AnyMedia,
  AnyMediaSchema,
  type MediaImage,
  MediaImageSchema,
  type PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';

export type ImageMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.IMAGE;
  /**
   * The image.
   */
  image: MediaImage;
  /**
   * A title for the image.
   */
  title?: string;
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const ImageMetadataDetailsSchema: z.ZodType<ImageMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.IMAGE),

    image: MediaImageSchema,

    title: NonEmptyStringSchema.describe('The optional image title.').optional(),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to model a post where an image is the main focus.
 *
 * Use the `lens.attachments` to include more images.
 */
export type ImageMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostMetadataSchemaId.IMAGE_LATEST;
  /**
   * The metadata details.
   */
  lens: ImageMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const ImageSchema = postWith({
  $schema: z.literal(PostMetadataSchemaId.IMAGE_LATEST),
  lens: ImageMetadataDetailsSchema,
});
