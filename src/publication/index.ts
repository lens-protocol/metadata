import { z } from 'zod';

export * from './common';
export * from './3D.js';
export * from './ArticleSchema.js';
export * from './AudioSchema.js';
export * from './CheckingInSchema.js';
export * from './EmbedSchema.js';
export * from './ImageSchema.js';
export * from './SchemaId.js';
export * from './TextOnlySchema.js';

import { ThreeDMetadataSchema } from './3D.js';
import { ArticleSchema } from './ArticleSchema.js';
import { AudioSchema } from './AudioSchema.js';
import { CheckingInSchema } from './CheckingInSchema.js';
import { EmbedSchema } from './EmbedSchema';
import { ImageSchema } from './ImageSchema.js';
import { TextOnlySchema } from './TextOnlySchema.js';

export const PublicationMetadataSchema = z.discriminatedUnion('$schema', [
  ArticleSchema,
  AudioSchema,
  CheckingInSchema,
  EmbedSchema,
  ImageSchema,
  TextOnlySchema,
  ThreeDMetadataSchema,
]);
export type PublicationMetadata = z.infer<typeof PublicationMetadataSchema>;
