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
import { PostSchemaId } from './PostSchemaId.js';
import {
  type AnyMedia,
  AnyMediaSchema,
  type PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';

export type EmbedMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.EMBED;
  /**
   * The embed URL.
   */
  embed: URI;
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const EmbedMetadataDetailsSchema: z.ZodType<EmbedMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.EMBED),

    embed: URISchema.describe('The embed URL.'),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to model a post that embeds a resource such as a micro-app, a game, etc.
 */
export type EmbedMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.EMBED_LATEST;
  /**
   * The metadata details.
   */
  lens: EmbedMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const EmbedSchema = postWith({
  $schema: z.literal(PostSchemaId.EMBED_LATEST),
  lens: EmbedMetadataDetailsSchema,
});
