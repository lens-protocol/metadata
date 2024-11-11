import { z } from 'zod';

import { GroupMetadataSchemaId } from './GroupMetadataSchemaId';
import { NonEmptyStringSchema, Signature, SignatureSchema, UriSchema } from '../primitives';

export type GroupMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The name of the Community.
   */
  name: string;
  /**
   * The slug for the Community.
   */
  slug: string;
  /**
   * Optional markdown formatted description of the Community.
   */
  description?: string | null;

  /**
   * Optional uri of the Community's icon.
   */
  icon?: string | null;
};

export const GroupMetadataDetailsSchema: z.ZodType<GroupMetadataDetails, z.ZodTypeDef, object> =
  z.object({
    id: NonEmptyStringSchema.describe(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),
    name: NonEmptyStringSchema.describe('The name of the Community.'),
    slug: NonEmptyStringSchema.describe('The slug for the Community.'),
    description: NonEmptyStringSchema.optional().describe(
      'Optional markdown formatted description of the Community.',
    ),
    icon: UriSchema.nullable().optional().describe("Optional uri of the Community's icon."),
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
