import { z } from 'zod';

import { UsernameMetadataSchemaId } from './UsernameMetadataSchemaId';
import { NonEmptyStringSchema, Signature, SignatureSchema } from '../primitives';
import { Eip7572, eip7572SchemaWith } from '../tokens/eip7572';

export type UsernameMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * An optional description of the Username collection.
   */
  description?: string;
};

const UsernameMetadataDetailsSchema: z.ZodType<UsernameMetadataDetails, z.ZodTypeDef, object> =
  z.object({
    id: NonEmptyStringSchema.describe(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),
    description: NonEmptyStringSchema.optional().describe(
      'An optional description of the Username collection.',
    ),
  });

export type UsernameMetadata = Eip7572 & {
  $schema: UsernameMetadataSchemaId.LATEST;
  lens: UsernameMetadataDetails;
  signature?: Signature;
};

export const UsernameMetadataSchema: z.ZodType<UsernameMetadata, z.ZodTypeDef, object> =
  eip7572SchemaWith({
    $schema: z.literal(UsernameMetadataSchemaId.LATEST),
    lens: UsernameMetadataDetailsSchema,
    signature: SignatureSchema.optional(),
  });
