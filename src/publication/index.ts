import { z } from 'zod';

export * from './common';
export * from './ArticleSchema.js';
export * from './ImageSchema.js';
export * from './SchemaId.js';
export * from './TextOnly.js';
export * from './3D.js';

import { ThreeDMetadataSchema } from './3D';
import { ArticleSchema } from './ArticleSchema';
import { ImageSchema } from './ImageSchema.js';
import { TextOnlySchema } from './TextOnly.js';

export const PublicationMetadataSchema = z.discriminatedUnion('$schema', [
  ArticleSchema,
  ImageSchema,
  TextOnlySchema,
  ThreeDMetadataSchema,
]);
export type PublicationMetadata = z.infer<typeof PublicationMetadataSchema>;
