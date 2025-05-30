import { z } from 'zod';

import { NonEmptyStringSchema, type Signature } from '../primitives';
import { GraphMetadataSchemaId } from './GraphMetadataSchemaId';

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
   * Optional markdown formatted description of the graph.
   */
  description?: string;
};

const GraphMetadataDetailsSchema: z.ZodType<GraphMetadataDetails, z.ZodTypeDef, object> = z.object({
  id: NonEmptyStringSchema.describe(
    'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
  ),
  name: NonEmptyStringSchema.describe('The name of the graph.'),
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
