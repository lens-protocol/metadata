import { z } from 'zod';

import { CommunityMetadataSchemaId } from './CommunityMetadataSchemaId';
import { NonEmptyStringSchema, Signature, SignatureSchema, UriSchema } from '../primitives';

export type CommunityMetadata = {
  /**
   * The schema id.
   */
  $schema: CommunityMetadataSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: CommunityMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

export type CommunityMetadataDetails = {
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

export const CommunityMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the Community.'),
  slug: NonEmptyStringSchema.describe('The slug for the Community.'),
  description: NonEmptyStringSchema.optional().describe(
    'Optional markdown formatted description of the Community.',
  ),
  icon: UriSchema.nullable().optional().describe("Optional uri of the Community's icon."),
});

export const CommunityMetadataSchema = z.object({
  schema: z.literal(CommunityMetadataSchemaId.LATEST),
  lens: CommunityMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
