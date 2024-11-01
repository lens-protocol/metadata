import { z } from 'zod';

import { UsernameMetadataSchemaId } from './UsernameMetadataSchemaId';
import { Eip7572, eip7572SchemaWith } from '../eip7572';
import { NonEmptyStringSchema, Signature, SignatureSchema } from '../primitives';

export type UsernameMetadata = Eip7572 & {
  schema: UsernameMetadataSchemaId.LATEST;
  lens: UsernameMetadataDetails;
  signature?: Signature;
};

export type UsernameMetadataDetails = {
  /**
   * An optional description of the Username collection.
   */
  description?: string | null;
};

const UsernameMetadataDetailsSchema = z.object({
  description: NonEmptyStringSchema.nullable()
    .optional()
    .describe('An optional description of the Username collection.'),
});

export const UsernameMetadataSchema = eip7572SchemaWith({
  schema: z.literal(UsernameMetadataSchemaId.LATEST),
  lens: UsernameMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
