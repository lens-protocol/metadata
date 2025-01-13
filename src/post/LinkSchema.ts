import { z } from 'zod';

import {
  type Markdown,
  MarkdownSchema,
  type Signature,
  type URI,
  URISchema,
} from '../primitives.js';
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

export type LinkMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.LINK;
  /**
   * The sharing link url.
   */
  sharingLink: URI;
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const LinkMetadataDetailsSchema: z.ZodType<LinkMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.LINK),

    sharingLink: URISchema.describe('The sharing link url.'),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to share a link to something you want to share.
 */
export type LinkMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostMetadataSchemaId.LINK_LATEST;
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
  $schema: z.literal(PostMetadataSchemaId.LINK_LATEST),
  lens: LinkMetadataDetailsSchema,
});
