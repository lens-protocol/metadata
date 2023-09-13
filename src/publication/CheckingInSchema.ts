import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { AddressSchema, GeoURISchema, notEmptyString } from '../primitives.js';

/**
 * @internal
 */
export const CheckingInSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.CHECKING_IN_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.CHECKING_IN),

    location: notEmptyString('Where you checking in from (free form text).'),

    position: GeoURISchema.optional().describe('The optional geographic position of the location.'),

    address: AddressSchema.optional().describe('The optional address of the location.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type CheckingInMetadata = z.infer<typeof CheckingInSchema>;
