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
export * from './LiveStreamSchema.js';
export * from './MintSchema.js';
export * from './MirrorSchemaId.js';
export * from './MirrorMetadataSchema.js';
export * from './PublicationMainFocus.js';
export * from './PublicationSchemaId.js';
export * from './SpaceSchema.js';
export * from './StorySchema.js';
export * from './TextOnlySchema.js';
export * from './TransactionSchema.js';
export * from './VideoSchema.js';

import { ThreeDMetadata, ThreeDSchema } from './3D.js';
import { ArticleMetadata, ArticleSchema } from './ArticleSchema.js';
import { AudioMetadata, AudioSchema } from './AudioSchema.js';
import { CheckingInMetadata, CheckingInSchema } from './CheckingInSchema.js';
import { EmbedMetadata, EmbedSchema } from './EmbedSchema';
import { EventMetadata, EventSchema } from './EventSchema.js';
import { ImageMetadata, ImageSchema } from './ImageSchema.js';
import { LinkMetadata, LinkSchema } from './LinkSchema.js';
import { LiveStreamMetadata, LiveStreamSchema } from './LiveStreamSchema.js';
import { MintMetadata, MintSchema } from './MintSchema.js';
import { SpaceMetadata, SpaceSchema } from './SpaceSchema.js';
import { StoryMetadata, StorySchema } from './StorySchema.js';
import { TextOnlyMetadata, TextOnlySchema } from './TextOnlySchema.js';
import { TransactionMetadata, TransactionSchema } from './TransactionSchema.js';
import { VideoMetadata, VideoSchema } from './VideoSchema.js';
import { ShapeCheck } from '../utils';

/**
 * `PublicationMetadata` is a discriminated union of all primary publication metadata.
 *
 * @example
 * Use the `$schema` property to narrow down the type of the metadata:
 * ```ts
 * const metadata: PublicationMetadata = ...
 *
 * if (metadata.$schema === PublicationSchemaId.ARTICLE_LATEST) {
 *   // metadata is ArticleMetadata
 *   metadata.content; // => always string, not undefined
 * }
 * ```
 *
 * @example
 * Use the `$schema` property to determine the type of the metadata in an exhaustive switch statement:
 * ```ts
 * const metadata: PublicationMetadata = ...
 *
 * switch (metadata.$schema) {
 *   case PublicationSchemaId.ARTICLE_LATEST:
 *     // metadata is ArticleMetadata
 *     break;
 *   case PublicationSchemaId.AUDIO_LATEST:
 *     // metadata is AudioMetadata
 *     break;
 *   case PublicationSchemaId.IMAGE_LATEST:
 *     // metadata is ImageMetadata
 *     break;
 *   case PublicationSchemaId.TEXT_ONLY_LATEST:
 *     // metadata is TextOnlyMetadata
 *     break;
 *   // ...
 * }
 * ```
 */
export type PublicationMetadata = ShapeCheck<
  | ArticleMetadata
  | AudioMetadata
  | CheckingInMetadata
  | EmbedMetadata
  | EventMetadata
  | ImageMetadata
  | LinkMetadata
  | LiveStreamMetadata
  | MintMetadata
  | SpaceMetadata
  | TextOnlyMetadata
  | StoryMetadata
  | TransactionMetadata
  | ThreeDMetadata
  | VideoMetadata
>;

/**
 * A union of all publication metadata schemas.
 *
 * @category Parse
 *
 * @example
 * with `parse`:
 * ```ts
 * PublicationMetadataSchema.parse(valid); // => PublicationMetadata
 *
 * PublicationMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```ts
 * PublicationMetadataSchema.safeParse(valid);
 * // => { success: true, data: PublicationMetadata }
 *
 * PublicationMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const PublicationMetadataSchema: z.ZodType<PublicationMetadata, z.ZodTypeDef, object> =
  z.discriminatedUnion('$schema', [
    ArticleSchema,
    AudioSchema,
    CheckingInSchema,
    EmbedSchema,
    EventSchema,
    ImageSchema,
    LinkSchema,
    LiveStreamSchema,
    MintSchema,
    SpaceSchema,
    TextOnlySchema,
    StorySchema,
    TransactionSchema,
    ThreeDSchema,
    VideoSchema,
  ]);
