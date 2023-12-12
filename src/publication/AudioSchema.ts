import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  mainContentFocus,
  MarketplaceMetadata,
  MediaAudio,
  MediaAudioSchema,
  metadataDetailsWith,
  optionalContentSchema,
  PublicationMetadataCommon,
  publicationWith,
} from './common';
import { EncryptableMarkdown, nonEmptyStringSchema, Signature } from '../primitives.js';

export type AudioMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.AUDIO;
  /**
   * The audio.
   */
  audio: MediaAudio;
  /**
   * The optional audio title.
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

const AudioMetadataDetailsSchema: z.ZodType<AudioMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.AUDIO),

    audio: MediaAudioSchema,

    title: nonEmptyStringSchema('The optional audio title.').optional(),

    content: optionalContentSchema(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to model a publication where an audio is the main focus.
 *
 * Use the `lens.attachments` to include more media.
 */
export type AudioMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.AUDIO_LATEST;
  /**
   * The metadata details.
   */
  lens: AudioMetadataDetails;
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
export const AudioSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.AUDIO_LATEST),
  lens: AudioMetadataDetailsSchema,
});
