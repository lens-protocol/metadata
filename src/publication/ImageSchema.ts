import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MarketplaceMetadata,
  MediaImage,
  MediaImageSchema,
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

export type ImageMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.IMAGE;
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
    mainContentFocus: mainContentFocus(PublicationMainFocus.IMAGE),

    image: MediaImageSchema,

    title: nonEmptyStringSchema('The optional image title.').optional(),

    content: encryptableMarkdownSchema('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to model a publication where an image is the main focus.
 *
 * Use the `lens.attachments` to include more images.
 */
export type ImageMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.IMAGE_LATEST;
  /**
   * The metadata details.
   */
  lens: ImageMetadataDetails;
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
export const ImageSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.IMAGE_LATEST),
  lens: ImageMetadataDetailsSchema,
});
