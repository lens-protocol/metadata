import { z } from 'zod';

import { GraphMetadataSchemaId } from './GraphMetadataSchemaId';
import { NonEmptyStringSchema, Signature } from '../primitives';

export type GraphMetadata = {
  /**
   * The schema id.
   */
  $schema: GraphMetadataSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: GraphMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

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

export const GraphMetadataSchema = z.object({
  schema: z.literal(GraphMetadataSchemaId.LATEST),
  lens: GraphMetadataDetailsSchema,
});
