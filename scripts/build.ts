import { join } from 'path';

import fs from 'fs-extra';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import {
  AnyMediaSchema,
  ArticleSchema,
  AudioSchema,
  CheckingInSchema,
  EmbedSchema,
  EventSchema,
  GeoLocationSchema,
  ImageSchema,
  LinkSchema,
  LivestreamSchema,
  MarketplaceMetadataAttributeSchema,
  MediaAudioSchema,
  MediaImageSchema,
  MediaVideoSchema,
  MetadataAttributeSchema,
  MetadataLicenseTypeSchema,
  MintSchema,
  SpaceSchema,
  StorySchema,
  TextOnlySchema,
  ThreeDMetadataSchema,
} from '../src/index.js';

const outputDir = 'jsonschemas';

await fs.ensureDir(outputDir);

const schemas = new Map<string, z.ZodSchema<unknown>>([
  ['3D/1-0-0.json', ThreeDMetadataSchema],
  ['article/1-0-0.json', ArticleSchema],
  ['audio/1-0-0.json', AudioSchema],
  ['checking-in/1-0-0.json', CheckingInSchema],
  ['embed/1-0-0.json', EmbedSchema],
  ['event/1-0-0.json', EventSchema],
  ['image/1-0-0.json', ImageSchema],
  ['link/1-0-0.json', LinkSchema],
  ['livestream/1-0-0.json', LivestreamSchema],
  ['mint/1-0-0.json', MintSchema],
  ['space/1-0-0.json', SpaceSchema],
  ['story/1-0-0.json', StorySchema],
  ['text-only/1-0-0.json', TextOnlySchema],
]);

for (const [path, Schema] of schemas) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      AnyMedia: AnyMediaSchema,
      GeoLocation: GeoLocationSchema,
      MarketplaceMetadataAttribute: MarketplaceMetadataAttributeSchema,
      MediaAudio: MediaAudioSchema,
      MediaImage: MediaImageSchema,
      MediaVideo: MediaVideoSchema,
      MetadataAttribute: MetadataAttributeSchema,
      MetadataLicenseType: MetadataLicenseTypeSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}
