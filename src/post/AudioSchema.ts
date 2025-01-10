import { z } from 'zod';

import {
  type Markdown,
  MarkdownSchema,
  NonEmptyStringSchema,
  type Signature,
} from '../primitives.js';
import type { NftMetadata } from '../tokens/eip721.js';
import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  type AnyMedia,
  AnyMediaSchema,
  type MediaAudio,
  MediaAudioSchema,
  type PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';

export type AudioMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.AUDIO;
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
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const AudioMetadataDetailsSchema: z.ZodType<AudioMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.AUDIO),

    audio: MediaAudioSchema,

    title: NonEmptyStringSchema.describe('The optional audio title.').optional(),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to model a post where an audio is the main focus.
 *
 * Use the `lens.attachments` to include more media.
 */
export type AudioMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.AUDIO_LATEST;
  /**
   * The metadata details.
   */
  lens: AudioMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const AudioSchema = postWith({
  $schema: z.literal(PostSchemaId.AUDIO_LATEST),
  lens: AudioMetadataDetailsSchema,
});
