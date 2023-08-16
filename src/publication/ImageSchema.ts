import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  MediaImageSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';

/**
 * @internal
 */
export const ImageSchema = publicationWith({
  $schema: z.literal(SchemaId.IMAGE),
  lens: metadataDetailsWith({
    image: MediaImageSchema,

    mainContentFocus: mainContentFocus(PublicationMainFocus.IMAGE),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type ImageMetadata = z.infer<typeof ImageSchema>;
