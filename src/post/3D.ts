import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  mainContentFocus,
  PostMetadataCommon,
  metadataDetailsWith,
  MetadataLicenseType,
  MetadataLicenseTypeSchema,
  postWith,
} from './common';
import {
  Signature,
  URI,
  MarkdownSchema,
  NonEmptyStringSchema,
  URISchema,
  Markdown,
} from '../primitives.js';
import { NftMetadata } from '../tokens/eip721.js';

/**
 * The 3D format type.
 */
export enum ThreeDFormat {
  GLTF = 'gLTF/GLB',
  FBX = 'FBX',
  VRM = 'VRM',
  OBJ = 'OBJ',
}

/**
 * A 3D asset.
 */
export type ThreeDAsset = {
  /**
   * The URI of the 3D asset zip file.
   */
  uri: URI;
  /**
   * The URL of the recommended web based 3D player to use to view the 3D asset.
   */
  playerUrl: URI;
  /**
   * The 3D format of the asset.
   */
  format: ThreeDFormat;
  /**
   * Path in extracted zip. Relative. 3D start point, MUST be 3D file type.
   */
  zipPath?: string;
  /**
   * The license regulating the use of the 3D asset.
   */
  license?: MetadataLicenseType;
};
/**
 * @internal
 */
export const ThreeDAssetSchema: z.ZodType<ThreeDAsset, z.ZodTypeDef, object> = z.object({
  uri: URISchema.describe('The URI of the 3D asset zip file.'),
  zipPath: NonEmptyStringSchema.optional().describe(
    'Path in extracted zip. Relative. 3D start point, MUST be 3D file type.',
  ),
  playerUrl: URISchema.describe(
    'The URL of the recommended web based 3D player to use to view the 3D asset.',
  ),
  format: z.nativeEnum(ThreeDFormat).describe('The 3D format of the asset.'),
  license: MetadataLicenseTypeSchema.optional().describe(
    'The license regulating the use of the 3D asset.',
  ),
});

export type ThreeDMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.THREE_D;
  /**
   * The 3D items for the post.
   */
  assets: ThreeDAsset[];
  /**
   * Optional markdown content.
   */
  content?: Markdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};
const ThreeDMetadataDetailsSchema: z.ZodType<ThreeDMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.THREE_D),

    assets: ThreeDAssetSchema.array().min(1).describe('The 3D items for the post'),

    content: MarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to share a 3D piece of art.
 */
export type ThreeDMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.THREE_D_LATEST;
  /**
   * The metadata details.
   */
  lens: ThreeDMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const ThreeDSchema = postWith({
  $schema: z.literal(PostSchemaId.THREE_D_LATEST),

  lens: ThreeDMetadataDetailsSchema,
});
