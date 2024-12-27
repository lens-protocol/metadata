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
  GeoURI,
  PhysicalAddress,
  PhysicalAddressSchema,
  Signature,
  GeoURISchema,
  NonEmptyStringSchema,
  MarkdownSchema,
  Markdown,
} from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

export type CheckingInMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.CHECKING_IN;
  /**
   * Where you checking in from (free form text).
   */
  location: string;
  /**
   * The optional geographic position of the location.
   */
  position?: GeoURI;
  /**
   * The optional address of the location.
   */
  address?: PhysicalAddress;
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const CheckingInMetadataDetailsSchema: z.ZodType<CheckingInMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.CHECKING_IN),

    location: NonEmptyStringSchema.describe('Where you checking in from (free form text).'),

    position: GeoURISchema.describe(
      'The optional geographic position of the location.',
    ).optional(),

    address: PhysicalAddressSchema.optional().describe('The optional address of the location.'),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to notify your community that you are checking in from a location.
 */
export type CheckingInMetadata = NftMetadata & {
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
