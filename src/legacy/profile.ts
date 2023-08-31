import { z } from 'zod';

import { markdown, notEmptyString } from '../primitives';

export enum ProfileMetadataAttributeDisplayType {
  number = 'number',
  string = 'string',
  date = 'date',
}

function serializeValue(value: unknown): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

const ProfileMetadataAttributeSchema = z.object({
  // On the paper ProfileMetadataAttributeDisplayType but validation never checked for it
  // so to avoid breaking changes we are keeping it as string
  displayType: z.string().optional(),

  traitType: z.string().optional(),

  value: z.unknown().transform(serializeValue),

  key: z.unknown().transform(serializeValue),
});
export type ProfileMetadataAttribute = z.infer<typeof ProfileMetadataAttributeSchema>;

/**
 * Profile Metadata schema.
 *
 * @example
 * with `parse`:
 * ```typescript
 * legacy.ProfileMetadataSchema.parse(valid); // => legacy.ProfileMetadata
 *
 * legacy.ProfileMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```typescript
 * legacy.ProfileMetadataSchema.safeParse(valid);
 * // => { success: true, data: legacy.ProfileMetadata }
 *
 * legacy.ProfileMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const ProfileMetadataSchema = z.object({
  version: z.literal('1.0.0').describe('The metadata version.'),

  metadata_id: z.string({
    description:
      'The metadata id can be anything but if your uploading to ipfs ' +
      'you will want it to be random. Using uuid could be an option!',
  }),

  name: notEmptyString('The display name for the profile.').nullable(),

  bio: markdown('The bio for the profile.').nullable(),

  cover_picture: z.string({ description: 'Cover picture.' }).nullable(),

  attributes: ProfileMetadataAttributeSchema.array().describe(
    'An optional bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.',
  ),
});

export type ProfileMetadata = z.infer<typeof ProfileMetadataSchema>;
