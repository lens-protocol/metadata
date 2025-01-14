import { z } from 'zod';

import { NonEmptyStringSchema, type Signature, SignatureSchema } from '../primitives';
import { type Eip7572, eip7572SchemaWith } from '../tokens/eip7572';
import { NamespaceMetadataSchemaId } from './NamespaceMetadataSchemaId';

export type NamespaceMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * An optional description of the username Namespace.
   */
  description?: string;
};

const NamespaceMetadataDetailsSchema: z.ZodType<NamespaceMetadataDetails, z.ZodTypeDef, object> =
  z.object({
    id: NonEmptyStringSchema.describe(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),
    description: NonEmptyStringSchema.optional().describe(
      'An optional description of the username Namespace.',
    ),
  });

export type NamespaceMetadata = Eip7572 & {
  $schema: NamespaceMetadataSchemaId.LATEST;
  lens: NamespaceMetadataDetails;
  signature?: Signature;
};

export const NamespaceMetadataSchema: z.ZodType<NamespaceMetadata, z.ZodTypeDef, object> =
  eip7572SchemaWith({
    $schema: z.literal(NamespaceMetadataSchemaId.LATEST),
    lens: NamespaceMetadataDetailsSchema,
    signature: SignatureSchema.optional(),
  });
