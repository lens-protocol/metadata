import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMediaSchema,
  MediaImageSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import { nonEmptyStringSchema } from '../primitives.js';

/**
 * @internal
 */
export const ImageSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.IMAGE_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.IMAGE),

    image: MediaImageSchema,

    title: nonEmptyStringSchema('The optional image title.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type ImageMetadata = z.infer<typeof ImageSchema>;
