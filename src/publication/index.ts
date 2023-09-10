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
export * from './PublicationMainFocus.js';
export * from './PublicationSchemaId.js';
export * from './SpaceSchema.js';
export * from './StorySchema.js';
export * from './TextOnlySchema.js';
export * from './TransactionSchema.js';
export * from './VideoSchema.js';

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
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { SpaceSchema } from './SpaceSchema.js';
import { StorySchema } from './StorySchema.js';
import { TextOnlySchema } from './TextOnlySchema.js';
import { TransactionSchema } from './TransactionSchema.js';
import { VideoSchema } from './VideoSchema.js';
import { MetadataCoreSchema, publicationWith } from './common';

/**
 * Mirror metadata schema.
 *
 * @example
 * with `parse`:
 * ```typescript
 * MirrorMetadata.parse(valid); // => MirrorMetadata
 *
 * MirrorMetadata.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```typescript
 * MirrorMetadata.safeParse(valid);
 * // => { success: true, data: MirrorMetadata }
 *
 * MirrorMetadata.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const MirrorMetadataSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.MIRROR_LATEST),

  lens: MetadataCoreSchema,
});
export type MirrorMetadata = z.infer<typeof MirrorMetadataSchema>;

/**
 * A union of all publication metadata schemas.
 *
 * @example
 * with `parse`:
 * ```typescript
 * PublicationMetadataSchema.parse(valid); // => PublicationMetadata
 *
 * PublicationMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```typescript
 * PublicationMetadataSchema.safeParse(valid);
 * // => { success: true, data: PublicationMetadata }
 *
 * PublicationMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
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
  TextOnlySchema,
  StorySchema,
  TransactionSchema,
  ThreeDMetadataSchema,
  VideoSchema,
]);

/**
 * The type of a publication metadata object.
 */
export type PublicationMetadata = z.infer<typeof PublicationMetadataSchema>;
