import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MediaImage,
  MediaImageSchema,
  PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';
import {
  EncryptableMarkdown,
  EncryptableMarkdownSchema,
  NonEmptyStringSchema,
  Signature,
} from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

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
  content?: EncryptableMarkdown;
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

    content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

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
  $schema: PostSchemaId.IMAGE_LATEST;
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
  $schema: z.literal(PostSchemaId.IMAGE_LATEST),
  lens: ImageMetadataDetailsSchema,
});
