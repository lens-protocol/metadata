import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import { MarketplaceMetadata } from '../marketplace.js';
import {
  EncryptableDateTime,
  EncryptableMarkdown,
  EncryptableURI,
  Signature,
  EncryptableUriSchema,
  EncryptableDateTimeSchema,
  EncryptableMarkdownSchema,
  NonEmptyStringSchema,
} from '../primitives.js';

export type SpaceMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.SPACE;
  /**
   * The space title.
   */
  title: string;
  /**
   * The space join link.
   */
  link: EncryptableURI;
  /**
   * The space start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  startsAt: EncryptableDateTime;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

export const SpaceMetadataDetailsSchema: z.ZodType<SpaceMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.SPACE),

    title: NonEmptyStringSchema.describe('The space title.'),

    link: EncryptableUriSchema.describe('The space join link.'),

    startsAt: EncryptableDateTimeSchema.describe(
      'The space start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to notify your community about a space you are hosting.
 */
export type SpaceMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.SPACE_LATEST;
  /**
   * The metadata details.
   */
  lens: SpaceMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const SpaceSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.SPACE_LATEST),

  lens: SpaceMetadataDetailsSchema,
});
