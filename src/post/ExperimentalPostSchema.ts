import { z } from 'zod';

import { NonEmptyStringSchema, type Signature } from '../primitives.js';
import type { NftMetadata } from '../tokens/eip721.js';
import { PostMainFocus } from './PostMainFocus.js';
import { PostMetadataSchemaId } from './PostMetadataSchemaId.js';
import { type PostMetadataCommon, metadataDetailsWith, postWith } from './common/index.js';

export type ExperimentalPostMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus;
  /**
   * A sub-identifier for the custom post type.
   * This is used to differentiate between different custom post types.
   */
  name: string;
};

const ExperimentalPostMetadataDetailsSchema: z.ZodType<
  ExperimentalPostMetadataDetails,
  z.ZodTypeDef,
  object
> = metadataDetailsWith({
  mainContentFocus: z.nativeEnum(PostMainFocus),

  name: NonEmptyStringSchema.describe(
    'A sub-identifier for the custom post type. This is used to differentiate between different custom post types.',
  ),
});

export type ExperimentalPostMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostMetadataSchemaId.EXPERIMENTAL_LATEST;
  /**
   * The metadata details.
   */
  lens: ExperimentalPostMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

export const ExperimentalPostSchema = postWith({
  $schema: z.literal(PostMetadataSchemaId.EXPERIMENTAL_LATEST),
  lens: ExperimentalPostMetadataDetailsSchema,
});
