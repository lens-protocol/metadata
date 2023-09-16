import { z } from 'zod';

import { MetadataLicenseType, MetadataLicenseTypeSchema } from './license.js';
import { MetadataAttribute, MetadataAttributeSchema } from '../../MetadataAttribute.js';
import {
  EncryptableString,
  EncryptableURI,
  encryptableStringSchema,
  encryptableUriSchema,
} from '../../primitives.js';

const MediaCommonSchema = z.object({
  item: encryptableUriSchema('The location of the file.'),
  attributes: MetadataAttributeSchema.array()
    .min(1)
    .optional()
    .describe(
      'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.',
    ),
});

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
  item: EncryptableURI;
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
  cover?: EncryptableURI;
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
  credits?: EncryptableString;
  /**
   * The name of the artist.
   */
  artist?: EncryptableString;
  /**
   * The genre of the audio.
   */
  genre?: EncryptableString;
  /**
   * The record label for the audio.
   */
  recordLabel?: EncryptableString;
  /**
   * The type of audio.
   */
  kind?: MediaAudioKind;
  /**
   * The lyrics for the audio.
   */
  lyrics?: EncryptableURI;
};

/**
 * @internal
 */
export const MediaAudioSchema = MediaCommonSchema.extend({
  type: z.nativeEnum(MediaAudioMimeType, { description: 'The mime type of the audio file.' }),
  cover: encryptableUriSchema('The cover image for the audio.').optional(),
  duration: z
    .number({ description: 'How long the the audio is in seconds.' })
    .positive()
    .int()
    .optional(),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the audio.'),
  credits: encryptableStringSchema('The credits for the audio.').optional(),
  artist: encryptableStringSchema('The name of the artist.').optional(),
  genre: encryptableStringSchema('The genre of the audio').optional(),
  recordLabel: encryptableStringSchema('The record label for the audio.').optional(),
  kind: z.nativeEnum(MediaAudioKind, { description: 'The type of audio.' }).optional(),
  lyrics: encryptableUriSchema('The lyrics for the audio.').optional(),
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
  item: EncryptableURI;
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
  altTag?: EncryptableString;
  /**
   * The license for the image.
   */
  license?: MetadataLicenseType;
};

/**
 * @internal
 */
export const MediaImageSchema = MediaCommonSchema.extend({
  type: z.nativeEnum(MediaImageMimeType, { description: 'The mime type of the image' }),
  altTag: encryptableStringSchema('The alt tag for accessibility').optional(),
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
  item: EncryptableURI;
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
  altTag?: EncryptableString;
  /**
   * The cover image for the video.
   */
  cover?: EncryptableURI;
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
export const MediaVideoSchema = MediaCommonSchema.extend({
  type: z.nativeEnum(MediaVideoMimeType, { description: 'The mime type of the video' }),
  altTag: encryptableStringSchema('The alt tag for accessibility').optional(),
  cover: encryptableUriSchema('The cover image for the video').optional(),
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

/**
 * @internal
 */
export const AnyMediaSchema: z.ZodType<AnyMedia, z.ZodTypeDef, object> = z.discriminatedUnion(
  'type',
  [MediaAudioSchema, MediaImageSchema, MediaVideoSchema],
);
