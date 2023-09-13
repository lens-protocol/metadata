import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMediaSchema,
  TimezoneIdSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import {
  AddressSchema,
  GeoURISchema,
  datetimeSchema,
  notEmptyString,
  uriSchema,
} from '../primitives.js';

/**
 * @internal
 */
export const SchedulingAdjustmentsSchema = z.object({
  timezoneId: TimezoneIdSchema.describe(
    'Indicates a reference timezone for the event start and end times. ' +
      'If physical event, you could use the timezone of the event location. If virtual event, the timezone of the event organizer.',
  ),
  timezoneOffset: z
    .number()
    .describe(
      'Indicates the reference timezone offset with respect to UTC timezone a the time of event creation. ' +
        'The difference in minutes between the reference timezone time and UTC time ' +
        '(e.g. UTC+2 would be -120, UTC-5 would be 300, UTC would be 0).',
    ),
});
export type SchedulingAdjustments = z.infer<typeof SchedulingAdjustmentsSchema>;

/**
 * @internal
 */
export const EventSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.EVENT_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.EVENT),

    location: z
      .union([
        uriSchema('A virtual location.'),
        notEmptyString('The event location (free form text).'),
      ])
      .describe('The location of the event.'),

    position: GeoURISchema.optional().describe('The optional geographic position of the event.'),

    address: AddressSchema.optional().describe('The optional address of the event.'),

    startsAt: datetimeSchema('The event start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).'),

    endsAt: datetimeSchema('The event end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).'),

    schedulingAdjustments: SchedulingAdjustmentsSchema.optional().describe(
      'Captures extra criteria to recompute correctly future start and end times.' +
        'See: https://www.w3.org/International/wiki/WorkingWithTimeZones#Working_with_Future_and_Recurring_Events',
    ),

    links: uriSchema().array().min(1).optional().describe('The links you want to include with it.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type EventMetadata = z.infer<typeof EventSchema>;
