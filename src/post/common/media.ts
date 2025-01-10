import { z } from 'zod';

import { type MetadataAttribute, MetadataAttributeSchema } from '../../MetadataAttribute.js';
import { NonEmptyStringSchema, type URI, URISchema } from '../../primitives.js';
import { type MetadataLicenseType, MetadataLicenseTypeSchema } from './license.js';

function mediaCommonSchema<Augmentation extends z.ZodRawShape>(augmentation: Augmentation) {
  return z
    .object({
      item: URISchema,
      attributes: MetadataAttributeSchema.array()
        .min(1)
        .describe(
          'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.',
        )
        .optional(),
    })
    .extend(augmentation);
}

/**
 * The kind of audio media.
 */
export enum MediaAudioKind {
  MUSIC = 'MUSIC',
  PODCAST = 'PODCAST',
  AUDIOBOOK = 'AUDIOBOOK',
  VOICE_NOTE = 'VOICE_NOTE',
  SOUND = 'SOUND',
  OTHER = 'OTHER',
}

/**
 * Audio mime type.
 */
export enum MediaAudioMimeType {
  WAV = 'audio/wav',
  WAV_VND = 'audio/vnd.wave',
  MP3 = 'audio/mpeg',
  OGG_AUDIO = 'audio/ogg',
  MP4_AUDIO = 'audio/mp4',
  AAC = 'audio/aac',
  WEBM_AUDIO = 'audio/webm',
  FLAC = 'audio/flac',
}

export type MediaAudio = {
  /**
   * The location of the file.
   */
  item: URI;
  /**
   * A bag of attributes that can be used to store any kind
   * of metadata that is not currently supported by the standard.
   */
  attributes?: MetadataAttribute[];
  /**
   * The mime type of the audio.
   */
  type: MediaAudioMimeType;
  /**
   * The cover image for the audio.
   */
  cover?: URI;
  /**
   * How long the the audio is in seconds.
   */
  duration?: number;
  /**
   * The license for the audio.
   */
  license?: MetadataLicenseType;
  /**
   * The credits for the audio.
   */
  credits?: string;
  /**
   * The name of the artist.
   */
  artist?: string;
  /**
   * The genre of the audio.
   */
  genre?: string;
  /**
   * The record label for the audio.
   */
  recordLabel?: string;
  /**
   * The type of audio.
   */
  kind?: MediaAudioKind;
  /**
   * The lyrics for the audio.
   */
  lyrics?: URI;
};

/**
 * @internal
 */
export const MediaAudioSchema = mediaCommonSchema({
  type: z.nativeEnum(MediaAudioMimeType, { description: 'The mime type of the audio file.' }),
  cover: URISchema.optional(),
  duration: z
    .number({ description: 'How long the the audio is in seconds.' })
    .positive()
    .int()
    .optional(),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the audio.'),
  credits: NonEmptyStringSchema.describe('The credits for the audio.').optional(),
  artist: NonEmptyStringSchema.describe('The name of the artist.').optional(),
  genre: NonEmptyStringSchema.describe('The genre of the audio').optional(),
  recordLabel: NonEmptyStringSchema.describe('The record label for the audio.').optional(),
  kind: z.nativeEnum(MediaAudioKind, { description: 'The type of audio.' }).optional(),
  lyrics: URISchema.optional(),
});

/**
 * Image mime type.
 */
export enum MediaImageMimeType {
  BMP = 'image/bmp',
  GIF = 'image/gif',
  HEIC = 'image/heic',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  SVG_XML = 'image/svg+xml',
  TIFF = 'image/tiff',
  WEBP = 'image/webp',
  X_MS_BMP = 'image/x-ms-bmp',
}

export type MediaImage = {
  /**
   * The location of the file.
   */
  item: URI;
  /**
   * A bag of attributes that can be used to store any kind
   * of metadata that is not currently supported by the standard.
   */
  attributes?: MetadataAttribute[];
  /**
   * The mime type of the image.
   */
  type: MediaImageMimeType;
  /**
   * The alt tag for accessibility.
   */
  altTag?: string;
  /**
   * The license for the image.
   */
  license?: MetadataLicenseType;
};

/**
 * @internal
 */
export const MediaImageSchema = mediaCommonSchema({
  type: z.nativeEnum(MediaImageMimeType, { description: 'The mime type of the image' }),
  altTag: NonEmptyStringSchema.describe('The alt tag for accessibility').optional(),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the image'),
});

/**
 * Video mime type.
 */
export enum MediaVideoMimeType {
  GLTF = 'model/gltf+json',
  GLTF_BINARY = 'model/gltf-binary',
  M4V = 'video/x-m4v',
  MOV = 'video/mov',
  MP4 = 'video/mp4',
  MPEG = 'video/mpeg',
  OGG = 'video/ogg',
  OGV = 'video/ogv',
  QUICKTIME = 'video/quicktime',
  WEBM = 'video/webm',
}

export type MediaVideo = {
  /**
   * The location of the file.
   */
  item: URI;
  /**
   * A bag of attributes that can be used to store any kind
   * of metadata that is not currently supported by the standard.
   */
  attributes?: MetadataAttribute[];
  /**
   * The mime type of the video.
   */
  type: MediaVideoMimeType;
  /**
   * The alt tag for accessibility.
   */
  altTag?: string;
  /**
   * The cover image for the video.
   */
  cover?: URI;
  /**
   * How long the the video is in seconds.
   */
  duration?: number;
  /**
   * The license for the video.
   */
  license?: MetadataLicenseType;
};

/**
 * @internal
 */
export const MediaVideoSchema = mediaCommonSchema({
  type: z.nativeEnum(MediaVideoMimeType, { description: 'The mime type of the video' }),
  altTag: NonEmptyStringSchema.describe('The alt tag for accessibility').optional(),
  cover: URISchema.optional(),
  duration: z
    .number({ description: 'How long the the video is in seconds' })
    .positive()
    .int()
    .optional(),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the video'),
});

/**
 * Any media type.
 */
export type AnyMedia = MediaAudio | MediaImage | MediaVideo;

const MediaLikeShape = z.object({
  type: z.string(),
});

function hasMediaLikeShape(val: unknown): val is z.infer<typeof MediaLikeShape> {
  return MediaLikeShape.safeParse(val).success;
}

function resolveAnyMediaSchema(val: unknown) {
  if (!hasMediaLikeShape(val)) return MediaLikeShape;

  switch (val.type) {
    case MediaAudioMimeType.WAV:
    case MediaAudioMimeType.WAV_VND:
    case MediaAudioMimeType.MP3:
    case MediaAudioMimeType.OGG_AUDIO:
    case MediaAudioMimeType.MP4_AUDIO:
    case MediaAudioMimeType.AAC:
    case MediaAudioMimeType.WEBM_AUDIO:
    case MediaAudioMimeType.FLAC:
      return MediaAudioSchema;

    case MediaImageMimeType.BMP:
    case MediaImageMimeType.GIF:
    case MediaImageMimeType.HEIC:
    case MediaImageMimeType.JPEG:
    case MediaImageMimeType.PNG:
    case MediaImageMimeType.SVG_XML:
    case MediaImageMimeType.TIFF:
    case MediaImageMimeType.WEBP:
    case MediaImageMimeType.X_MS_BMP:
      return MediaImageSchema;

    case MediaVideoMimeType.GLTF:
    case MediaVideoMimeType.GLTF_BINARY:
    case MediaVideoMimeType.M4V:
    case MediaVideoMimeType.MOV:
    case MediaVideoMimeType.MP4:
    case MediaVideoMimeType.MPEG:
    case MediaVideoMimeType.OGG:
    case MediaVideoMimeType.OGV:
    case MediaVideoMimeType.QUICKTIME:
    case MediaVideoMimeType.WEBM:
      return MediaVideoSchema;
  }

  return null;
}

/**
 * @internal
 */
export const AnyMediaSchema: z.ZodType<AnyMedia, z.ZodTypeDef, unknown> = z
  .discriminatedUnion('type', [MediaAudioSchema, MediaImageSchema, MediaVideoSchema])
  // the following is necessary cause discriminatedUnion does not properly work when
  // the discriminant is a union of enums, so we keep the discriminatedUnion for the
  // correct JSON Schema definition but we manually refine the type for runtime checks
  .catch((ctx) => ctx.input as AnyMedia) // passthrough even if might not be an AnyMedia type
  .superRefine((val: unknown, ctx): val is AnyMedia => {
    const schema = resolveAnyMediaSchema(val);

    if (!schema) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_union_discriminator,
        options: [
          ...new Set(
            [
              Object.values(MediaAudioMimeType),
              Object.values(MediaImageMimeType),
              Object.values(MediaVideoMimeType),
            ].flat(),
          ),
        ],
        message:
          'Invalid discriminator value. Expected one of `MediaAudioMimeType`, `MediaImageMimeType`, `MediaVideoMimeType` values.',
      });
      return z.NEVER;
    }

    const result = schema.safeParse(val);

    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue(issue);
      }
    }

    return z.NEVER;
  });
