import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  GeoLocationSchema,
  metadataDetailsWith,
  publicationWith,
} from './common/index.js';

export const CheckingInSchema = publicationWith({
  $schema: z.literal(SchemaId.CHECKING_IN),
  lens: metadataDetailsWith({
    location: z.string({ description: 'Where you checking in from' }),

    geographic: GeoLocationSchema.optional().describe('The direct location if you wish to do so'),

    mainContentFocus: z.literal(PublicationMainFocus.CHECKING_IN, {
      description: 'The main focus of the publication',
    }),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it'),
  }),
});
export type CheckingIn = z.infer<typeof CheckingInSchema>;
