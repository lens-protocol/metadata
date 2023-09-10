import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMediaSchema,
  metadataDetailsWith,
  MetadataLicenseTypeSchema,
  publicationWith,
} from './common';
import { notEmptyString, uriSchema } from '../primitives.js';

export enum ThreeDFormat {
  gLTF = 'gLTF/GLB',
  fbx = 'FBX',
  vrm = 'VRM',
  obj = 'OBJ',
}

/**
 * @internal
 */
export const ThreeDAssetSchema = z.object({
  uri: uriSchema('The 3D asset url or zip'),
  zipPath: notEmptyString()
    .optional()
    .describe('path in extracted zip. Relative. 3D start point, must be 3D file type'),
  playerUrl: uriSchema('Link to web based 3D player'),
  format: z.nativeEnum(ThreeDFormat).describe('format of the 3D object. gLTF/GLB, FBX, VRM or OBJ'),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the 3D asset'),
});
export type ThreeDAsset = z.infer<typeof ThreeDAssetSchema>;

export const ThreeDMetadataSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.THREE_D_LATEST),

  lens: metadataDetailsWith({
    mainContentFocus: z.literal(PublicationMainFocus.THREE_D),

    assets: ThreeDAssetSchema.array().min(1).describe('The 3D items for the publication'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type ThreeDMetadata = z.infer<typeof ThreeDMetadataSchema>;
