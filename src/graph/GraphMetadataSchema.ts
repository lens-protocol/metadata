import { z } from 'zod';

import { GraphMetadataSchemaId } from './GraphMetadataSchemaId';
import { NonEmptyStringSchema, Signature } from '../primitives';

export type GraphMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
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
  description?: string;
};

const GraphMetadataDetailsSchema: z.ZodType<GraphMetadataDetails, z.ZodTypeDef, object> = z.object({
  id: NonEmptyStringSchema.describe(
    'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
  ),
  name: NonEmptyStringSchema.describe('The name of the graph.'),
  title: NonEmptyStringSchema.describe('The human-friendly title for the graph.'),
  description: NonEmptyStringSchema.optional().describe(
    'Optional markdown formatted description of the graph.',
  ),
});

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

export const GraphMetadataSchema: z.ZodType<GraphMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(GraphMetadataSchemaId.LATEST),
  lens: GraphMetadataDetailsSchema,
});
