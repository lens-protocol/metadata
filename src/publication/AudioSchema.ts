import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  MediaAudioSchema,
  metadataDetailsWith,
  publicationWith,
} from './common';

/**
 * @internal
 */
export const AudioSchema = publicationWith({
  $schema: z.literal(SchemaId.AUDIO),
  lens: metadataDetailsWith({
    audio: MediaAudioSchema,

    mainContentFocus: mainContentFocus(PublicationMainFocus.AUDIO),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type AudioMetadata = z.infer<typeof AudioSchema>;
