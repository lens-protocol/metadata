import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  GeoLocationSchema,
  mainContentFocus,
  metadataDetailsWith,
  notEmptyString,
  publicationWith,
  unixTimestamp,
  uri,
} from './common';

/**
 * @internal
 */
export const EventSchema = publicationWith({
  $schema: z.literal(SchemaId.EVENT),
  lens: metadataDetailsWith({
    location: z
      .union([uri('A virtual location.'), notEmptyString('The event location (free form text).')])
      .describe('The location of the event.'),

    geographic: GeoLocationSchema.optional().describe('The direct location if you wish to do so.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.EVENT),

    startsAt: unixTimestamp('The event start time (unit timestamp).'),

    endsAt: unixTimestamp('The event end time (unit timestamp).'),

    links: uri().array().min(1).optional().describe('The links you want to include with it.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type EventMetadata = z.infer<typeof EventSchema>;
