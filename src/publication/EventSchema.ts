import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  PublicationMetadataCommon,
  TimezoneId,
  TimezoneIdSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import { MarketplaceMetadata } from '../marketplace.js';
import {
  PhysicalAddressSchema,
  EncryptableUriSchema,
  EncryptableURI,
  EncryptableString,
  EncryptableGeoURI,
  PhysicalAddress,
  EncryptableDateTime,
  EncryptableMarkdown,
  Signature,
  EncryptableDateTimeSchema,
  NonEmptyStringSchema,
  EncryptableMarkdownSchema,
  EncryptableStringSchema,
  EncryptableGeoURISchema,
} from '../primitives.js';

/**
 * An object intended to help with future events scheduling adjustments.
 *
 * @see https://www.w3.org/International/wiki/WorkingWithTimeZones#Working_with_Future_and_Recurring_Events
 */
export type SchedulingAdjustments = {
  /**
   * Indicates a reference timezone for the event start and end times.
   * If physical event, you could use the timezone of the event location. If virtual event, the timezone of the event organizer.
   */
  timezoneId: TimezoneId;
  /**
   * Indicates the reference timezone offset with respect to UTC timezone a the time of event creation.
   * The difference in minutes between the reference timezone time and UTC time (e.g. UTC+2 would be -120, UTC-5 would be 300, UTC would be 0).
   */
  timezoneOffset: number;
};

/**
 * @internal
 */
export const SchedulingAdjustmentsSchema: z.ZodType<SchedulingAdjustments, z.ZodTypeDef, object> =
  z.object({
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

export type EventMetadataDetails = PublicationMetadataCommon & {
  /**
   * The title of the event.
   */
  title?: string;
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.EVENT;
  /*
   * The location of the event.
   */
  location: EncryptableURI | EncryptableString;
  /**
   * The geographic position of the event.
   */
  position?: EncryptableGeoURI;
  /**
   * The address of the event.
   */
  address?: PhysicalAddress;
  /**
   * The event start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  startsAt: EncryptableDateTime;
  /**
   * The event end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  endsAt: EncryptableDateTime;
  /**
   * Captures extra criteria to recompute correctly future start and end times.
   *
   * @see https://www.w3.org/International/wiki/WorkingWithTimeZones#Working_with_Future_and_Recurring_Events
   */
  schedulingAdjustments?: SchedulingAdjustments;
  /**
   * The links you want to include with it.
   */
  links?: EncryptableURI[];
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const EventMetadataDetailsSchema: z.ZodType<EventMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    title: NonEmptyStringSchema.describe('The title of the event.').optional(),

    mainContentFocus: mainContentFocus(PublicationMainFocus.EVENT),

    location: z
      .union([
        EncryptableUriSchema.describe('A virtual location.'),
        EncryptableStringSchema.describe('The event location (free form text).'),
      ])
      .describe('The location of the event.'),

    position: EncryptableGeoURISchema.describe('The geographic position of the event.').optional(),

    address: PhysicalAddressSchema.optional().describe('The address of the event.'),

    startsAt: EncryptableDateTimeSchema.describe(
      'The event start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    endsAt: EncryptableDateTimeSchema.describe(
      'The event end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    schedulingAdjustments: SchedulingAdjustmentsSchema.optional().describe(
      'Captures extra criteria to recompute correctly future start and end times.' +
        'See: https://www.w3.org/International/wiki/WorkingWithTimeZones#Working_with_Future_and_Recurring_Events',
    ),

    links: EncryptableUriSchema.array()
      .min(1)
      .optional()
      .describe('The links you want to include with it.'),

    content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to create an event, virtual or physical.
 */
export type EventMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.EVENT_LATEST;
  /**
   * The metadata details.
   */
  lens: EventMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const EventSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.EVENT_LATEST),
  lens: EventMetadataDetailsSchema,
});
