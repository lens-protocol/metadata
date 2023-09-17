import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  mainContentFocus,
  PublicationMetadataCommon,
  metadataDetailsWith,
  MetadataLicenseType,
  MetadataLicenseTypeSchema,
  publicationWith,
  MarketplaceMetadata,
} from './common';
import {
  EncryptableMarkdown,
  encryptableMarkdownSchema,
  nonEmptyStringSchema,
  Signature,
  URI,
  uriSchema,
} from '../primitives.js';

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
  uri: uriSchema('The URI of the 3D asset zip file.'),
  zipPath: nonEmptyStringSchema()
    .optional()
    .describe('Path in extracted zip. Relative. 3D start point, MUST be 3D file type.'),
  playerUrl: uriSchema(
    'The URL of the recommended web based 3D player to use to view the 3D asset.',
  ),
  format: z.nativeEnum(ThreeDFormat).describe('The 3D format of the asset.'),
  license: MetadataLicenseTypeSchema.optional().describe(
    'The license regulating the use of the 3D asset.',
  ),
});

export type ThreeDMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.THREE_D;
  /**
   * The 3D items for the publication.
   */
  assets: ThreeDAsset[];
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};
const ThreeDMetadataDetailsSchema: z.ZodType<ThreeDMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.THREE_D),

    assets: ThreeDAssetSchema.array().min(1).describe('The 3D items for the publication'),

    content: encryptableMarkdownSchema('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to share a 3D piece of art.
 */
export type ThreeDMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.THREE_D_LATEST;
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
export const ThreeDSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.THREE_D_LATEST),

  lens: ThreeDMetadataDetailsSchema,
});
