import { z } from 'zod';

import { GraphMetadataSchemaId } from './GraphMetadataSchemaId';
import { marketplaceMetadataSchemaWith } from '../marketplace';
import { NonEmptyStringSchema } from '../primitives';

export type GraphMetadataDetails = {
  /**
   * The name of the graph.
   */
  name: string;
  /**
   * The human-friendly title for the graph.
   */
  title: string;
  /**
   * Optional markdown formatted description of the graph.
   */
  description?: string | null;
};

const GraphMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the graph.'),
  title: NonEmptyStringSchema.describe('The human-friendly title for the graph.'),
  description: NonEmptyStringSchema.optional().describe(
    'Optional markdown formatted description of the graph.',
  ),
});

export const GraphMetadataSchema = marketplaceMetadataSchemaWith({
  schema: z.literal(GraphMetadataSchemaId),
  lens: GraphMetadataDetailsSchema,
});
