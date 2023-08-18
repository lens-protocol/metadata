import { z } from 'zod';

import { MetadataAttributeSchema } from '../MetadataAttribute';
import { SchemasRoot } from '../constants';
import { SignatureSchema, markdown, notEmptyString, uri } from '../primitives';

/**
 * @internal
 */
export const ProfileMetadataDetailsSchema = z.object(
  {
    name: notEmptyString('The profile display name.').optional(),

    bio: markdown('The profile bio as markdown.').optional(),

    coverPicture: uri('The profile cover picture').optional(),

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
 * @internal
 */
export const ProfileMetadataSchema = z.object({
  $schema: z.literal(`${SchemasRoot}/profile/1.0.0.json`),

  lens: ProfileMetadataDetailsSchema,

  signature: SignatureSchema.optional(),
});
export type ProfileMetadata = z.infer<typeof ProfileMetadataSchema>;
