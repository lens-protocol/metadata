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
import { MarketplaceMetadata } from '../marketplace.js';
import {
  EncryptableMarkdown,
  EncryptableURI,
  Signature,
  EncryptableUriSchema,
  EncryptableMarkdownSchema,
} from '../primitives.js';

export type LinkMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.LINK;
  /**
   * The sharing link url.
   */
  sharingLink: EncryptableURI;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const LinkMetadataDetailsSchema: z.ZodType<LinkMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.LINK),

    sharingLink: EncryptableUriSchema.describe('The sharing link url.'),

    content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to share a link to something you want to share.
 */
export type LinkMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.LINK_LATEST;
  /**
   * The metadata details.
   */
  lens: LinkMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const LinkSchema = postWith({
  $schema: z.literal(PostSchemaId.LINK_LATEST),
  lens: LinkMetadataDetailsSchema,
});
