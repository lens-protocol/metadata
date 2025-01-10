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
  DateTime,
  Markdown,
  URI,
  Signature,
  URISchema,
  DateTimeSchema,
  MarkdownSchema,
  NonEmptyStringSchema,
} from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

export type SpaceMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.SPACE;
  /**
   * The space title.
   */
  title: string;
  /**
   * The space join link.
   */
  link: URI;
  /**
   * The space start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).
   */
  startsAt: DateTime;
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

export const SpaceMetadataDetailsSchema: z.ZodType<SpaceMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.SPACE),

    title: NonEmptyStringSchema.describe('The space title.'),

    link: URISchema.describe('The space join link.'),

    startsAt: DateTimeSchema.describe(
      'The space start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to notify your community about a space you are hosting.
 */
export type SpaceMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.SPACE_LATEST;
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
export const SpaceSchema = postWith({
  $schema: z.literal(PostSchemaId.SPACE_LATEST),

  lens: SpaceMetadataDetailsSchema,
});
