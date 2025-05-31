import { z } from 'zod';

import { NonEmptyStringSchema, type Signature } from '../primitives.js';
import type { NftMetadata } from '../tokens/eip721.js';
import { PostMainFocus } from './PostMainFocus.js';
import { PostMetadataSchemaId } from './PostMetadataSchemaId.js';
import {
  mainContentFocus,
  metadataDetailsWith,
  postWith,
  type PostMetadataCommon,
} from './common';

export type CustomMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.CUSTOM;
  /**
   * A JSON string containing any custom data.
   */
  value: string;
};

const CustomMetadataDetailsSchema: z.ZodType<CustomMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.CUSTOM),

    value: NonEmptyStringSchema.describe('A JSON string containing any custom data.'),
  });

export type CustomMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostMetadataSchemaId.CUSTOM_LATEST;
  /**
   * The metadata details.
   */
  lens: CustomMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

export const CustomSchema = postWith({
  $schema: z.literal(PostMetadataSchemaId.CUSTOM_LATEST),
  lens: CustomMetadataDetailsSchema,
});
