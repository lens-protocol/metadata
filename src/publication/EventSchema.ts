import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  GeoLocationSchema,
  UnixTimestampSchema,
  metadataDetailsWith,
  publicationWith,
  uri,
} from './common/index.js';

export const EventSchema = publicationWith({
  $schema: z.literal(SchemaId.EVENT),
  lens: metadataDetailsWith({
    location: z
      .union([z.string({ description: 'A free-text location' }), uri('A virtual location')])
      .describe('The location of the event'),

    geographic: GeoLocationSchema.optional().describe('The direct location if you wish to do so'),

    mainContentFocus: z.literal(PublicationMainFocus.EVENT, {
      description: 'The main focus of the publication.',
    }),

    startsAt: UnixTimestampSchema.describe('The start time of the event'),

    endsAt: UnixTimestampSchema.describe('The end time of the event'),

    links: uri().array().min(1).optional().describe('The links you want to include with it'),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Event = z.infer<typeof EventSchema>;
