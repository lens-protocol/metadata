import { z } from 'zod';

import { GroupMetadataSchemaId } from './GroupMetadataSchemaId';
import { NonEmptyStringSchema, Signature, SignatureSchema, UriSchema } from '../primitives';

export type GroupMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The name of the Group.
   */
  name: string;
  /**
   * Optional markdown formatted description of the Group.
   */
  description?: string;
  /**
   * Optional uri of the Group's icon.
   */
  icon?: string;
  /**
   * Optional uri of the Group's cover picture.
   */
  coverPicture?: string;
};

export const GroupMetadataDetailsSchema: z.ZodType<GroupMetadataDetails, z.ZodTypeDef, object> =
  z.object({
    id: NonEmptyStringSchema.describe(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),
    name: z
      .string({ description: 'The name of the Group.' })
      .regex(
        /^[a-zA-Z0-9-]{1,50}$/,
        'Group name must be between 1 and 50 characters long and contain only alphanumeric characters and hyphens.',
      ),
    description: NonEmptyStringSchema.optional().describe(
      'Optional markdown formatted description of the Group.',
    ),
    icon: UriSchema.optional().describe("Optional uri of the Group's icon."),
    coverPicture: UriSchema.optional().describe("Optional uri of the Group's cover picture."),
  });

export type GroupMetadata = {
  /**
   * The schema id.
   */
  $schema: GroupMetadataSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: GroupMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

export const GroupMetadataSchema: z.ZodType<GroupMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(GroupMetadataSchemaId.LATEST),
  lens: GroupMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
