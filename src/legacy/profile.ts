import { v4 } from 'uuid';
import { z } from 'zod';

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
  displayType: z.string().nullable().optional().catch(null),

  traitType: z.string().nullable().optional().catch(null),

  value: z.unknown().transform(serializeValue),

  key: z.unknown().transform(serializeValue),
});
export type ProfileMetadataAttribute = z.infer<typeof ProfileMetadataAttributeSchema>;

/**
 * Profile Metadata schema.
 *
 * @category Parse
 *
 * @example
 * with `parse`:
 * ```ts
 * legacy.ProfileMetadataSchema.parse(valid); // => legacy.ProfileMetadata
 *
 * legacy.ProfileMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```ts
 * legacy.ProfileMetadataSchema.safeParse(valid);
 * // => { success: true, data: legacy.ProfileMetadata }
 *
 * legacy.ProfileMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const ProfileMetadataSchema = z
  .object({
    version: z.literal('1.0.0').describe('The metadata version.').catch('1.0.0'),

    metadata_id: z
      .string({
        description:
          'The metadata id can be anything but if your uploading to ipfs ' +
          'you will want it to be random. Using uuid could be an option!',
      })
      .catch(() => v4()),

    name: z.string({ description: 'The display name for the profile.' }).nullable().catch(null),

    bio: z.string({ description: 'The bio for the profile.' }).nullable().optional().catch(null),

    cover_picture: z.string({ description: 'Cover picture.' }).nullable().optional().catch(null),

    attributes: ProfileMetadataAttributeSchema.array()
      .describe(
        'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.',
      )
      .optional(),
  })
  .passthrough(); // make it more loose to allow for past profile metadata

export type ProfileMetadata = z.infer<typeof ProfileMetadataSchema>;
