import { z } from 'zod';

import { ProfileSchemaId } from './ProfileSchemaId.js';
import { MetadataAttribute, MetadataAttributeSchema } from '../MetadataAttribute.js';
import {
  AppIdSchema,
  Markdown,
  Signature,
  SignatureSchema,
  URI,
  markdownSchema,
  nonEmptyStringSchema,
  uriSchema,
} from '../primitives.js';

export type ProfileMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The profile display name.
   */
  name?: string;
  /**
   * The profile bio as markdown.
   */
  bio?: Markdown;
  /**
   * The profile picture.
   */
  picture?: URI;
  /**
   * The profile cover picture.
   */
  coverPicture?: URI;
  /**
   * A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.
   * Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.
   */
  attributes?: MetadataAttribute[];
};
/**
 * @internal
 */
const ProfileMetadataDetailsSchema: z.ZodType<ProfileMetadataDetails, z.ZodTypeDef, object> =
  z.object(
    {
      id: nonEmptyStringSchema(
        'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
      ),

      name: nonEmptyStringSchema('The profile display name.').optional(),

      bio: markdownSchema('The profile bio as markdown.').optional(),

      picture: uriSchema('The profile picture.').optional(),

      coverPicture: uriSchema('The profile cover picture.').optional(),

      attributes: MetadataAttributeSchema.array()
        .min(1)
        .optional()
        .describe(
          'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
            'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
        ),

      appId: AppIdSchema.optional().describe(
        'The App Id that this Profile data refers to. ' +
          'If omitted the data is considered to be the global Profile data.',
      ),
    },
    { description: 'The Lens specific metadata details.' },
  );

/**
 * Use this to create Profile metadata objects.
 */
export type ProfileMetadata = {
  /**
   * The schema id.
   */
  $schema: ProfileSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: ProfileMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * Profile Metadata schema.
 *
 * @category Parse
 *
 * @example
 * with `parse`:
 * ```typescript
 * ProfileMetadataSchema.parse(valid); // => ProfileMetadata
 *
 * ProfileMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```typescript
 * ProfileMetadataSchema.safeParse(valid);
 * // => { success: true, data: ProfileMetadata }
 *
 * ProfileMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const ProfileMetadataSchema: z.ZodType<ProfileMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(ProfileSchemaId.LATEST),
  lens: ProfileMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
