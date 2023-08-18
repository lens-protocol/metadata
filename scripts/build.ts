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
  ProfileMetadataSchema,
  SpaceSchema,
  StorySchema,
  TextOnlySchema,
  ThreeDMetadataSchema,
  TransactionSchema,
  VideoSchema,
} from '../src';

const outputDir = 'jsonschemas';

await fs.ensureDir(outputDir);

// Publication schemas
const schemas = new Map<string, z.ZodSchema<unknown>>([
  ['publications/3D/1.0.0.json', ThreeDMetadataSchema],
  ['publications/article/1.0.0.json', ArticleSchema],
  ['publications/audio/1.0.0.json', AudioSchema],
  ['publications/checking-in/1.0.0.json', CheckingInSchema],
  ['publications/embed/1.0.0.json', EmbedSchema],
  ['publications/event/1.0.0.json', EventSchema],
  ['publications/image/1.0.0.json', ImageSchema],
  ['publications/link/1.0.0.json', LinkSchema],
  ['publications/livestream/1.0.0.json', LivestreamSchema],
  ['publications/mint/1.0.0.json', MintSchema],
  ['publications/space/1.0.0.json', SpaceSchema],
  ['publications/story/1.0.0.json', StorySchema],
  ['publications/text-only/1.0.0.json', TextOnlySchema],
  ['publications/transaction/1.0.0.json', TransactionSchema],
  ['publications/video/1.0.0.json', VideoSchema],
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

// Profile schema
const outputFile = join(outputDir, 'profile/1.0.0.json');

await fs.ensureFile(outputFile);

const jsonSchema = zodToJsonSchema(ProfileMetadataSchema, {
  target: 'jsonSchema7',
  definitionPath: '$defs',
  definitions: {
    MetadataAttribute: MetadataAttributeSchema,
  },
});

await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
