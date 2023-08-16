import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  MediaAudioSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';

export const AudioSchema = publicationWith({
  $schema: z.literal(SchemaId.AUDIO),
  lens: metadataDetailsWith({
    audio: MediaAudioSchema,

    mainContentFocus: mainContentFocus(PublicationMainFocus.AUDIO),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Audio = z.infer<typeof AudioSchema>;
