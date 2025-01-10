import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  PostMetadataCommon,
  TimezoneId,
  TimezoneIdSchema,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';
import {
  PhysicalAddressSchema,
  GeoURI,
  PhysicalAddress,
  DateTime,
  Signature,
  DateTimeSchema,
  NonEmptyStringSchema,
  GeoURISchema,
  URISchema,
  URI,
  MarkdownSchema,
  Markdown,
} from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

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

export type EventMetadataDetails = PostMetadataCommon & {
  /**
   * The title of the event.
   */
  title?: string;
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.EVENT;
  /*
   * The location of the event.
   */
  location: URI | string;
  /**
   * The geographic position of the event.
   */
  position?: GeoURI;
  /**
   * The address of the event.
   */
  address?: PhysicalAddress;
  /**
   * The event start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  startsAt: DateTime;
  /**
   * The event end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  endsAt: DateTime;
  /**
   * Captures extra criteria to recompute correctly future start and end times.
   *
   * @see https://www.w3.org/International/wiki/WorkingWithTimeZones#Working_with_Future_and_Recurring_Events
   */
  schedulingAdjustments?: SchedulingAdjustments;
  /**
   * The links you want to include with it.
   */
  links?: URI[];
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const EventMetadataDetailsSchema: z.ZodType<EventMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    title: NonEmptyStringSchema.describe('The title of the event.').optional(),

    mainContentFocus: mainContentFocus(PostMainFocus.EVENT),

    location: z
      .union([
        URISchema.describe('A virtual location.'),
        NonEmptyStringSchema.describe('The event location (free form text).'),
      ])
      .describe('The location of the event.'),

    position: GeoURISchema.describe('The geographic position of the event.').optional(),

    address: PhysicalAddressSchema.optional().describe('The address of the event.'),

    startsAt: DateTimeSchema.describe(
      'The event start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    endsAt: DateTimeSchema.describe(
      'The event end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    schedulingAdjustments: SchedulingAdjustmentsSchema.optional().describe(
      'Captures extra criteria to recompute correctly future start and end times.' +
      'See: https://www.w3.org/International/wiki/WorkingWithTimeZones#Working_with_Future_and_Recurring_Events',
    ),

    links: URISchema.array()
      .min(1)
      .optional()
      .describe('The links you want to include with it.'),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to create an event, virtual or physical.
 */
export type EventMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.EVENT_LATEST;
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
export const EventSchema = postWith({
  $schema: z.literal(PostSchemaId.EVENT_LATEST),
  lens: EventMetadataDetailsSchema,
});
