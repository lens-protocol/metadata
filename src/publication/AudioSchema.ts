import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  MediaAudioSchema,
  metadataDetailsWith,
  publicationWith,
} from './common/index.js';

export const AudioSchema = publicationWith({
  $schema: z.literal(SchemaId.AUDIO),
  lens: metadataDetailsWith({
    audio: MediaAudioSchema,

    mainContentFocus: z.literal(PublicationMainFocus.AUDIO, {
      description: 'The main focus of the publication',
    }),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it'),
  }),
});
export type Audio = z.infer<typeof AudioSchema>;
