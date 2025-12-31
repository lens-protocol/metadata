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
export * from './ExperimentalPostSchema.js';
export * from './PostMainFocus.js';
export * from './PostMetadataSchemaId.js';
export * from './SpaceSchema.js';
export * from './StorySchema.js';
export * from './TextOnlySchema.js';
export * from './TransactionSchema.js';
export * from './VideoSchema.js';

import type { ShapeCheck } from '../utils';
import { type ThreeDMetadata, ThreeDSchema } from './3D.js';
import { type ArticleMetadata, ArticleSchema } from './ArticleSchema.js';
import { type AudioMetadata, AudioSchema } from './AudioSchema.js';
import { type CheckingInMetadata, CheckingInSchema } from './CheckingInSchema.js';
import { type EmbedMetadata, EmbedSchema } from './EmbedSchema';
import { type EventMetadata, EventSchema } from './EventSchema.js';
import { type ExperimentalPostMetadata, ExperimentalPostSchema } from './ExperimentalPostSchema.js';
import { type ImageMetadata, ImageSchema } from './ImageSchema.js';
import { type LinkMetadata, LinkSchema } from './LinkSchema.js';
import { type LiveStreamMetadata, LiveStreamSchema } from './LiveStreamSchema.js';
import { type MintMetadata, MintSchema } from './MintSchema.js';
import { type SpaceMetadata, SpaceSchema } from './SpaceSchema.js';
import { type StoryMetadata, StorySchema } from './StorySchema.js';
import { type TextOnlyMetadata, TextOnlySchema } from './TextOnlySchema.js';
import { type TransactionMetadata, TransactionSchema } from './TransactionSchema.js';
import { type VideoMetadata, VideoSchema } from './VideoSchema.js';

/**
 * `PostMetadata` is a discriminated union of all possible post metadata types.
 *
 * @example
 * Use the `$schema` property to narrow down the type of the metadata:
 * ```ts
 * const metadata: PostMetadata = ...
 *
 * if (metadata.$schema === PostSchemaId.ARTICLE_LATEST) {
 *   // metadata is ArticleMetadata
 *   metadata.content; // => always string, not undefined
 * }
 * ```
 *
 * @example
 * Use the `$schema` property to determine the type of the metadata in an exhaustive switch statement:
 * ```ts
 * const metadata: PostMetadata = ...
 *
 * switch (metadata.$schema) {
 *   case PostSchemaId.ARTICLE_LATEST:
 *     // metadata is ArticleMetadata
 *     break;
 *   case PostSchemaId.AUDIO_LATEST:
 *     // metadata is AudioMetadata
 *     break;
 *   case PostSchemaId.IMAGE_LATEST:
 *     // metadata is ImageMetadata
 *     break;
 *   case PostSchemaId.TEXT_ONLY_LATEST:
 *     // metadata is TextOnlyMetadata
 *     break;
 *   // ...
 * }
 * ```
 */
export type PostMetadata = ShapeCheck<
  | ArticleMetadata
  | AudioMetadata
  | CheckingInMetadata
  | EmbedMetadata
  | EventMetadata
  | ImageMetadata
  | LinkMetadata
  | LiveStreamMetadata
  | MintMetadata
  | ExperimentalPostMetadata
  | SpaceMetadata
  | TextOnlyMetadata
  | StoryMetadata
  | TransactionMetadata
  | ThreeDMetadata
  | VideoMetadata
>;

/**
 * A union of all post metadata schemas.
 *
 * @category Parse
 *
 * @example
 * with `parse`:
 * ```ts
 * PostMetadataSchema.parse(valid); // => PostMetadata
 *
 * PostMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```ts
 * PostMetadataSchema.safeParse(valid);
 * // => { success: true, data: PostMetadata }
 *
 * PostMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const PostMetadataSchema: z.ZodType<PostMetadata, z.ZodTypeDef, object> =
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
    ExperimentalPostSchema,
    SpaceSchema,
    TextOnlySchema,
    StorySchema,
    TransactionSchema,
    ThreeDSchema,
    VideoSchema,
  ]);
