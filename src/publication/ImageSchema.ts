import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import { AnyMediaSchema, MediaImageSchema, metadataDetailsWith, publicationWith } from './common';

export const ImageMetadataDetails = z.object({});

export const ImageSchema = publicationWith({
  $schema: z.literal(SchemaId.IMAGE),
  lens: metadataDetailsWith({
    image: MediaImageSchema,

    mainContentFocus: z.literal(PublicationMainFocus.IMAGE, {
      description: 'The main focus of the image',
    }),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it'),
  }),
});
export type Image = z.infer<typeof ImageSchema>;
