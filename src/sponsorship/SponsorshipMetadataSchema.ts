import { z } from 'zod';

import { SponsorshipMetadataSchemaId } from './SponsorshipMetadataSchemaId';
import { Eip7572, Eip7572Schema } from '../eip7572';
import { NonEmptyStringSchema, Signature, SignatureSchema } from '../primitives';

export type SponsorshipMetadata = Eip7572 & {
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

export const SponsorshipMetadataSchema = Eip7572Schema.extend({
  schema: z.literal(SponsorshipMetadataSchemaId.LATEST),
  lens: SponsorshipMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
