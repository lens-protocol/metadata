import { z } from 'zod';

import { MetadataLicenseTypeSchema } from './license.js';
import { MetadataAttributeSchema } from '../../MetadataAttribute.js';
import { notEmptyString, uriSchema } from '../../primitives.js';

const MediaCommonSchema = z.object({
  item: uriSchema('The item is the url to the media'),
  altTag: notEmptyString('The alt tag for accessibility').optional(),
  attributes: MetadataAttributeSchema.array()
    .min(1)
    .optional()
    .describe(
      'An optional bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.',
    ),
});

export enum MediaAudioKind {
  MUSIC = 'MUSIC',
  PODCAST = 'PODCAST',
  AUDIOBOOK = 'AUDIOBOOK',
  VOICE_NOTE = 'VOICE_NOTE',
  SOUND = 'SOUND',
  OTHER = 'OTHER',
}

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

export const MediaAudioSchema = MediaCommonSchema.extend({
  type: z.nativeEnum(MediaAudioMimeType, { description: 'The mime type of the audio' }),
  cover: uriSchema('The cover image for the audio').optional(),
  duration: z
    .number({ description: 'How long the the audio is in seconds' })
    .positive()
    .int()
    .optional(),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the audio'),
  credits: notEmptyString('The credits for the audio').optional(),
  artist: notEmptyString('The artist for the audio').optional(),
  genre: notEmptyString('The genre of the audio').optional(),
  recordLabel: notEmptyString('The record label for the audio').optional(),
  kind: z.nativeEnum(MediaAudioKind, { description: 'The type of audio' }).optional(),
  lyrics: uriSchema('The lyrics for the audio').optional(),
});
export type MediaAudio = z.infer<typeof MediaAudioSchema>;

export enum MediaImageMimeType {
  BMP = 'image/x-ms-bmp',
  GIF = 'image/gif',
  HEIC = 'image/heic',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  TIFF = 'image/tiff',
  WEBP = 'image/webp',
}

export const MediaImageSchema = MediaCommonSchema.extend({
  type: z.nativeEnum(MediaImageMimeType, { description: 'The mime type of the image' }),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the image'),
});
export type MediaImage = z.infer<typeof MediaImageSchema>;

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

export const MediaVideoSchema = MediaCommonSchema.extend({
  type: z.nativeEnum(MediaVideoMimeType, { description: 'The mime type of the video' }),
  cover: uriSchema('The cover image for the video').optional(),
  duration: z
    .number({ description: 'How long the the video is in seconds' })
    .positive()
    .int()
    .optional(),
  license: MetadataLicenseTypeSchema.optional().describe('The license for the video'),
});
export type MediaVideo = z.infer<typeof MediaVideoSchema>;

export const AnyMediaSchema = z.union([MediaAudioSchema, MediaImageSchema, MediaVideoSchema]);
export type AnyMedia = z.infer<typeof AnyMediaSchema>;
