import { z } from 'zod';

import { MetadataAttributeSchema } from '../MetadataAttribute';
import { SchemasRoot } from '../constants';
import { SignatureSchema, markdownSchema, notEmptyString, uriSchema } from '../primitives';

/**
 * @internal
 */
export const ProfileMetadataDetailsSchema = z.object(
  {
    name: notEmptyString('The profile display name.').optional(),

    bio: markdownSchema('The profile bio as markdown.').optional(),

    picture: uriSchema('The profile picture.').optional(),

    coverPicture: uriSchema('The profile cover picture.').optional(),

    attributes: MetadataAttributeSchema.array()
      .min(1)
      .optional()
      .describe(
        'An optional bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
          'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
      ),
  },
  { description: 'The Lens specific metadata details.' },
);
export type ProfileMetadataDetails = z.infer<typeof ProfileMetadataDetailsSchema>;

/**
 * Profile Metadata schema.
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
export const ProfileMetadataSchema = z.object({
  $schema: z.literal(`${SchemasRoot}/profile/2.0.0.json`),

  lens: ProfileMetadataDetailsSchema,

  signature: SignatureSchema.optional(),
});
export type ProfileMetadata = z.infer<typeof ProfileMetadataSchema>;
