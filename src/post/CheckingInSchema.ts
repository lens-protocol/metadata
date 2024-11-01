import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';
import {
  EncryptableGeoURI,
  EncryptableMarkdown,
  EncryptableMarkdownSchema,
  EncryptableString,
  PhysicalAddress,
  PhysicalAddressSchema,
  Signature,
  EncryptableStringSchema,
  EncryptableGeoURISchema,
} from '../primitives.js';
import { MarketplaceMetadata } from '../tokens/eip721.js';

export type CheckingInMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.CHECKING_IN;
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
    mainContentFocus: mainContentFocus(PostMainFocus.CHECKING_IN),

    location: EncryptableStringSchema.describe('Where you checking in from (free form text).'),

    position: EncryptableGeoURISchema.describe(
      'The optional geographic position of the location.',
    ).optional(),

    address: PhysicalAddressSchema.optional().describe('The optional address of the location.'),

    content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

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
  $schema: PostSchemaId.CHECKING_IN_LATEST;
  /**
   * The metadata details.
   */
  lens: CheckingInMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const CheckingInSchema = postWith({
  $schema: z.literal(PostSchemaId.CHECKING_IN_LATEST),
  lens: CheckingInMetadataDetailsSchema,
});
