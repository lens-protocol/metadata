import { z } from 'zod';

import { GroupMetadataSchemaId } from './GroupMetadataSchemaId';
import { NonEmptyStringSchema, Signature, SignatureSchema, UriSchema } from '../primitives';

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

export type GroupMetadataDetails = {
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

export const GroupMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the Community.'),
  slug: NonEmptyStringSchema.describe('The slug for the Community.'),
  description: NonEmptyStringSchema.optional().describe(
    'Optional markdown formatted description of the Community.',
  ),
  icon: UriSchema.nullable().optional().describe("Optional uri of the Community's icon."),
});

export const GroupMetadataSchema = z.object({
  schema: z.literal(GroupMetadataSchemaId.LATEST),
  lens: GroupMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
