import { z } from 'zod';

export * from './common';
export * from './ImageSchema.js';
export * from './TextOnly.js';

import { ThreeDMetadataSchema } from './3D';
import { ImageSchema } from './ImageSchema.js';
import { TextOnlySchema } from './TextOnly.js';

export const PublicationMetadataSchema = z.discriminatedUnion('$schema', [
  ImageSchema,
  TextOnlySchema,
  ThreeDMetadataSchema,
]);
export type PublicationMetadata = z.infer<typeof PublicationMetadataSchema>;
