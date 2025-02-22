import { z } from 'zod';

import { NonEmptyStringSchema, type Signature, SignatureSchema } from '../primitives';
import { SponsorshipMetadataSchemaId } from './SponsorshipMetadataSchemaId';

export type SponsorshipMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The name of the Sponsorship.
   */
  name: string;
  /**
   * An optional description of the Sponsorship.
   */
  description?: string;
};

const SponsorshipMetadataDetailsSchema: z.ZodType<
  SponsorshipMetadataDetails,
  z.ZodTypeDef,
  object
> = z.object({
  id: NonEmptyStringSchema.describe(
    'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
  ),
  name: NonEmptyStringSchema.describe('The name of the Sponsorship.'),
  description: NonEmptyStringSchema.optional().describe(
    'An optional description of the Username collection.',
  ),
});

export type SponsorshipMetadata = {
  $schema: SponsorshipMetadataSchemaId.LATEST;
  lens: SponsorshipMetadataDetails;
  signature?: Signature;
};

export const SponsorshipMetadataSchema: z.ZodType<SponsorshipMetadata, z.ZodTypeDef, object> =
  z.object({
    $schema: z.literal(SponsorshipMetadataSchemaId.LATEST),
    lens: SponsorshipMetadataDetailsSchema,
    signature: SignatureSchema.optional(),
  });
