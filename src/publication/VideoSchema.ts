import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  MediaVideoSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';

export const VideoSchema = publicationWith({
  $schema: z.literal(SchemaId.VIDEO),
  lens: metadataDetailsWith({
    video: MediaVideoSchema,

    mainContentFocus: mainContentFocus(
      PublicationMainFocus.SHORT_VIDEO,
      PublicationMainFocus.VIDEO,
    ),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Video = z.infer<typeof VideoSchema>;
