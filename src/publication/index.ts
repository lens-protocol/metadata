import { z } from 'zod';

export * from './common';
export * from './ImageSchema.js';
export * from './TextOnly.js';

import { ImageSchema } from './ImageSchema.js';
import { TextOnlySchema } from './TextOnly.js';

export const PublicationMetadataSchema = z.discriminatedUnion('$schema', [
  ImageSchema,
  TextOnlySchema,
]);
export type PublicationMetadata = z.infer<typeof PublicationMetadataSchema>;
