import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MarketplaceMetadata,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  optionalContentSchema,
  publicationWith,
} from './common/index.js';
import {
  EncryptableDateTime,
  EncryptableMarkdown,
  EncryptableURI,
  Signature,
  encryptableDateTimeSchema,
  encryptableUriSchema,
  nonEmptyStringSchema,
} from '../primitives.js';

export type LiveStreamMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.LIVESTREAM;
  /**
   * The livestream title.
   */
  title?: string;
  /**
   * The stream start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  startsAt: EncryptableDateTime;
  /**
   * The optional stream end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  endsAt?: EncryptableDateTime;
  /**
   * Some livestream platforms have the playback url as a separate url.
   * If not your case make sure `liveUrl` and `playbackUrl` are the same.
   */
  playbackUrl: EncryptableURI;
  /**
   * Some livestream platforms have the live url as a separate url.
   * If not your case make sure `liveUrl` and `playbackUrl` are the same.
   */
  liveUrl: EncryptableURI;
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
  checkLiveAPI?: EncryptableURI;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const LiveStreamMetadataDetailsSchema: z.ZodType<LiveStreamMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.LIVESTREAM),

    title: nonEmptyStringSchema().optional().describe('The livestream title.'),

    startsAt: encryptableDateTimeSchema(
      'The stream start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    endsAt: encryptableDateTimeSchema(
      'The optional stream end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`)',
    ).optional(),

    playbackUrl: encryptableUriSchema(
      'Some livestream platforms have the playback url as a separate url. ' +
        'If not your case make sure `liveUrl` and `playbackUrl` are the same.',
    ),

    liveUrl: encryptableUriSchema(
      'Some livestream platforms have the live url as a separate url. ' +
        'If not your case make sure `liveUrl` and `playbackUrl` are the same.',
    ),

    checkLiveAPI: encryptableUriSchema(
      'The data cannot be changed so you can put in an API endpoint to know if it is still live or not for clients to be able to check.',
    ).optional(),

    content: optionalContentSchema(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to notify your community of a livestream event.
 */
export type LiveStreamMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.LIVESTREAM_LATEST;
  /**
   * The metadata details.
   */
  lens: LiveStreamMetadataDetails;
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
export const LiveStreamSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.LIVESTREAM_LATEST),
  lens: LiveStreamMetadataDetailsSchema,
});
