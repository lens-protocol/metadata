import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MarketplaceMetadata,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import {
  EncryptableGeoURI,
  EncryptableMarkdown,
  EncryptableString,
  PhysicalAddress,
  PhysicalAddressSchema,
  Signature,
  encryptableGeoUriSchema,
  encryptableMarkdownSchema,
  encryptableStringSchema,
} from '../primitives.js';

export type CheckingInMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.CHECKING_IN;
  /**
   * Where you checking in from (free form text).
   */
  location: EncryptableString;
  /**
   * The optional geographic position of the location.
   */
  position?: EncryptableGeoURI;
  /**
   * The optional address of the location.
   */
  address?: PhysicalAddress;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const CheckingInMetadataDetailsSchema: z.ZodType<CheckingInMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.CHECKING_IN),

    location: encryptableStringSchema('Where you checking in from (free form text).'),

    position: encryptableGeoUriSchema(
      'The optional geographic position of the location.',
    ).optional(),

    address: PhysicalAddressSchema.optional().describe('The optional address of the location.'),

    content: encryptableMarkdownSchema('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to notify your community that you are checking in from a location.
 */
export type CheckingInMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.CHECKING_IN_LATEST;
  /**
   * The metadata details.
   */
  lens: CheckingInMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   *
   * @experimental DO NOT use yet
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const CheckingInSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.CHECKING_IN_LATEST),
  lens: CheckingInMetadataDetailsSchema,
});
