import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMediaSchema,
  MediaVideoSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import { nonEmptyStringSchema } from '../primitives.js';

/**
 * @internal
 */
export const VideoSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.VIDEO_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(
      PublicationMainFocus.SHORT_VIDEO,
      PublicationMainFocus.VIDEO,
    ),

    video: MediaVideoSchema,

    title: nonEmptyStringSchema('The optional video title.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type VideoMetadata = z.infer<typeof VideoSchema>;
