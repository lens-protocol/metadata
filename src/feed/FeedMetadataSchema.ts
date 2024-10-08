import { z } from 'zod';

import { FeedMetadataSchemaId } from './FeedMetadataSchemaId';
import { marketplaceMetadataSchemaWith } from '../marketplace';
import { NonEmptyStringSchema } from '../primitives';

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

export const FeedMetadataSchema = marketplaceMetadataSchemaWith({
  schema: z.literal(FeedMetadataSchemaId),
  lens: FeedMetadataDetailsSchema,
});
