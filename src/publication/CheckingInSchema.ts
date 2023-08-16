import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  GeoLocationSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';

export const CheckingInSchema = publicationWith({
  $schema: z.literal(SchemaId.CHECKING_IN),
  lens: metadataDetailsWith({
    location: z.string({ description: 'Where you checking in from' }),

    geographic: GeoLocationSchema.optional().describe('The direct location if you wish to do so'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.CHECKING_IN),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type CheckingIn = z.infer<typeof CheckingInSchema>;
