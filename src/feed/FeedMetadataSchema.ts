import { z } from 'zod';

import { NonEmptyStringSchema, type Signature, SignatureSchema } from '../primitives';
import { FeedMetadataSchemaId } from './FeedMetadataSchemaId';

export type FeedMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The name of the Feed.
   */
  name: string;
  /**
   * Optional markdown formatted description of the Feed.
   */
  description?: string;
};

const FeedMetadataDetailsSchema: z.ZodType<FeedMetadataDetails, z.ZodTypeDef, object> = z.object({
  id: NonEmptyStringSchema.describe(
    'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
  ),
  name: NonEmptyStringSchema.describe('The name of the Feed.'),
  description: NonEmptyStringSchema.optional().describe(
    'Optional markdown formatted description of the Feed.',
  ),
});

export type FeedMetadata = {
  /**
   * The schema id.
   */
  $schema: FeedMetadataSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: FeedMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

export const FeedMetadataSchema: z.ZodType<FeedMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(FeedMetadataSchemaId.LATEST),
  lens: FeedMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
