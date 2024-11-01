import { z } from 'zod';

import { SponsorshipMetadataSchemaId } from './SponsorshipMetadataSchemaId';
import { NonEmptyStringSchema, Signature, SignatureSchema } from '../primitives';

export type SponsorshipMetadata = {
  schema: SponsorshipMetadataSchemaId.LATEST;
  lens: SponsorshipMetadataDetails;
  signature?: Signature;
};

export type SponsorshipMetadataDetails = {
  /**
   * The name of the Sponsorship.
   */
  name: string;
  /**
   * An optional description of the Sponsorship.
   */
  description?: string | null;
};

const SponsorshipMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the Sponsorship.'),
  description: NonEmptyStringSchema.nullable()
    .optional()
    .describe('An optional description of the Username collection.'),
});

export const SponsorshipMetadataSchema = z.object({
  schema: z.literal(SponsorshipMetadataSchemaId.LATEST),
  lens: SponsorshipMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
