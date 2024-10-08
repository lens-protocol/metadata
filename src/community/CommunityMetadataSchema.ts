import { z } from 'zod';

import { CommunityMetadataSchemaId } from './CommunityMetadataSchemaId';
import { marketplaceMetadataSchemaWith } from '../marketplace';
import { NonEmptyStringSchema } from '../primitives';

export type CommunityMetadataDetails = {
  /**
   * The name of the Community.
   */
  name: string;
  /**
   * The human-friendly title for the Community.
   */
  title: string;
  /**
   * Optional markdown formatted description of the Community.
   */
  description?: string | null;
};

const CommunityMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the Community.'),
  title: NonEmptyStringSchema.describe('The human-friendly title for the Community.'),
  description: NonEmptyStringSchema.optional().describe(
    'Optional markdown formatted description of the Community.',
  ),
});

export const CommunityMetadataSchema = marketplaceMetadataSchemaWith({
  schema: z.literal(CommunityMetadataSchemaId),
  lens: CommunityMetadataDetailsSchema,
});
