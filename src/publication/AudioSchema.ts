import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  MediaAudioSchema,
  metadataDetailsWith,
  publicationWith,
} from './common';
import { notEmptyString } from '../primitives.js';

/**
 * @internal
 */
export const AudioSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.AUDIO_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.AUDIO),

    audio: MediaAudioSchema,

    title: notEmptyString('The optional audio title.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type AudioMetadata = z.infer<typeof AudioSchema>;
