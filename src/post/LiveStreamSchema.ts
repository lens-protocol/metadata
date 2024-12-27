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
} from './common/index.js';
import {
  DateTime,
  Markdown,
  URI,
  Signature,
  UriSchema,
  NonEmptyStringSchema,
  DateTimeSchema,
  MarkdownSchema,
} from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

export type LiveStreamMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.LIVESTREAM;
  /**
   * The livestream title.
   */
  title?: string;
  /**
   * The stream start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  startsAt: DateTime;
  /**
   * The optional stream end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  endsAt?: DateTime;
  /**
   * Some livestream platforms have the playback url as a separate url.
   * If not your case make sure `liveUrl` and `playbackUrl` are the same.
   */
  playbackUrl: URI;
  /**
   * Some livestream platforms have the live url as a separate url.
   * If not your case make sure `liveUrl` and `playbackUrl` are the same.
   */
  liveUrl: URI;
  /**
   * The data cannot be changed so you can put in an API endpoint to know if it is still live or not for clients to be able to check.
   *
   * Responses from this endpoint should conform to the following schema:
   *
   * ```json
   * {
   *   "$schema": "http://json-schema.org/draft-07/schema#",
   *   "type": "object",
   *   "properties": {
   *     "isLive": {
   *       "type": "boolean"
   *     }
   *   },
   *   "required": ["isLive"]
   * }
   * ```
   */
  checkLiveAPI?: URI;
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const LiveStreamMetadataDetailsSchema: z.ZodType<LiveStreamMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.LIVESTREAM),

    title: NonEmptyStringSchema.optional().describe('The livestream title.'),

    startsAt: DateTimeSchema.describe(
      'The stream start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    endsAt: DateTimeSchema.describe(
      'The optional stream end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`)',
    ).optional(),

    playbackUrl: UriSchema.describe(
      'Some livestream platforms have the playback url as a separate url. ' +
      'If not your case make sure `liveUrl` and `playbackUrl` are the same.',
    ),

    liveUrl: UriSchema.describe(
      'Some livestream platforms have the live url as a separate url. ' +
      'If not your case make sure `liveUrl` and `playbackUrl` are the same.',
    ),

    checkLiveAPI: UriSchema.describe(
      'The data cannot be changed so you can put in an API endpoint to know if it is still live or not for clients to be able to check.',
    ).optional(),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to notify your community of a livestream event.
 */
export type LiveStreamMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.LIVESTREAM_LATEST;
  /**
   * The metadata details.
   */
  lens: LiveStreamMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const LiveStreamSchema = postWith({
  $schema: z.literal(PostSchemaId.LIVESTREAM_LATEST),
  lens: LiveStreamMetadataDetailsSchema,
});
