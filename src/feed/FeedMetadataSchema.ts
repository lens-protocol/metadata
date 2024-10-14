import { z } from 'zod';

import { FeedMetadataSchemaId } from './FeedMetadataSchemaId';
import { NonEmptyStringSchema, SignatureSchema, Signature } from '../primitives';

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

export type FeedMetadataDetails = {
  /**
   * The name of the Feed.
   */
  name: string;
  /**
   * The human-friendly title for the Feed.
   */
  title: string;
  /**
   * Optional markdown formatted description of the Feed.
   */
  description?: string | null;
};

const FeedMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the Feed.'),
  title: NonEmptyStringSchema.describe('The human-friendly title for the Feed.'),
  description: NonEmptyStringSchema.optional().describe(
    'Optional markdown formatted description of the Feed.',
  ),
});

export const FeedMetadataSchema = z.object({
  schema: z.literal(FeedMetadataSchemaId.LATEST),
  lens: FeedMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
