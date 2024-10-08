import { z } from 'zod';

import { UsernameMetadataSchemaId } from './UsernameMetadataSchemaId';
import { marketplaceMetadataSchemaWith } from '../marketplace';
import { NonEmptyStringSchema } from '../primitives';

export type UsernameMetadataDetails = {
  /**
   * The of the Username.
   */
  description?: string | null;
};

const UsernameMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the Username.'),
});

export const UsernameMetadataSchema = marketplaceMetadataSchemaWith({
  schema: z.literal(UsernameMetadataSchemaId),
  lens: UsernameMetadataDetailsSchema,
});
