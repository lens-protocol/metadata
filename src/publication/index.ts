import { z } from 'zod';

export * from './common';
export * from './3D.js';
export * from './ArticleSchema.js';
export * from './AudioSchema.js';
export * from './CheckingInSchema.js';
export * from './EmbedSchema.js';
export * from './EventSchema.js';
export * from './ImageSchema.js';
export * from './LinkSchema.js';
export * from './LivestreamSchema.js';
export * from './MintSchema.js';
export * from './SchemaId.js';
export * from './SpaceSchema.js';
export * from './StorySchema.js';
export * from './TextOnlySchema.js';

import { ThreeDMetadataSchema } from './3D.js';
import { ArticleSchema } from './ArticleSchema.js';
import { AudioSchema } from './AudioSchema.js';
import { CheckingInSchema } from './CheckingInSchema.js';
import { EmbedSchema } from './EmbedSchema';
import { EventSchema } from './EventSchema.js';
import { ImageSchema } from './ImageSchema.js';
import { LinkSchema } from './LinkSchema.js';
import { LivestreamSchema } from './LivestreamSchema.js';
import { MintSchema } from './MintSchema.js';
import { SpaceSchema } from './SpaceSchema.js';
import { StorySchema } from './StorySchema.js';
import { TextOnlySchema } from './TextOnlySchema.js';

export const PublicationMetadataSchema = z.discriminatedUnion('$schema', [
  ArticleSchema,
  AudioSchema,
  CheckingInSchema,
  EmbedSchema,
  EventSchema,
  ImageSchema,
  LinkSchema,
  LivestreamSchema,
  MintSchema,
  SpaceSchema,
  StorySchema,
  TextOnlySchema,
  ThreeDMetadataSchema,
]);
export type PublicationMetadata = z.infer<typeof PublicationMetadataSchema>;
