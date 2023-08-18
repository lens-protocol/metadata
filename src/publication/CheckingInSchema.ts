import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { GeoLocationSchema, notEmptyString } from '../primitives.js';

/**
 * @internal
 */
export const CheckingInSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.CHECKING_IN),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.CHECKING_IN),

    location: notEmptyString('Where you checking in from (free form text).'),

    geographic: GeoLocationSchema.optional().describe('The direct location if you wish to do so'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type CheckingInMetadata = z.infer<typeof CheckingInSchema>;
