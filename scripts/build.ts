import { join } from 'path';

import fs from 'fs-extra';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import {
  AdvancedContractConditionSchema,
  AnyMediaSchema,
  ArticleSchema,
  AudioSchema,
  CheckingInSchema,
  CollectConditionSchema,
  EmbedSchema,
  EoaOwnershipConditionSchema,
  Erc20OwnershipConditionSchema,
  EventSchema,
  FollowConditionSchema,
  ImageSchema,
  LinkSchema,
  LiveStreamSchema,
  MarketplaceMetadataAttributeSchema,
  MediaAudioSchema,
  MediaImageSchema,
  MediaVideoSchema,
  MetadataAttributeSchema,
  MetadataLicenseTypeSchema,
  MintSchema,
  NetworkAddressSchema,
  NftOwnershipConditionSchema,
  ProfileMetadataSchema,
  ProfileOwnershipConditionSchema,
  PublicationEncryptionStrategySchema,
  SpaceSchema,
  StorySchema,
  TextOnlySchema,
  ThreeDSchema,
  TransactionSchema,
  VideoSchema,
  ProfileIdSchema,
  EvmAddressSchema,
  AccessConditionSchema,
  PublicationIdSchema,
  AmountSchema,
  TagSchema,
  MirrorMetadataSchema,
  GeoURISchema,
  PhysicalAddressSchema,
  EncryptedStringSchema,
} from '../src';
import { ModuleMetadataSchema } from '../src/module';

const outputDir = 'jsonschemas';

await fs.ensureDir(outputDir);

// Publication schemas
const schemas = new Map<string, z.ZodSchema<unknown>>([
  ['publications/3d/3.0.0.json', ThreeDSchema],
  ['publications/article/3.0.0.json', ArticleSchema],
  ['publications/audio/3.0.0.json', AudioSchema],
  ['publications/checking-in/3.0.0.json', CheckingInSchema],
  ['publications/embed/3.0.0.json', EmbedSchema],
  ['publications/event/3.0.0.json', EventSchema],
  ['publications/image/3.0.0.json', ImageSchema],
  ['publications/link/3.0.0.json', LinkSchema],
  ['publications/livestream/3.0.0.json', LiveStreamSchema],
  ['publications/mint/3.0.0.json', MintSchema],
  ['publications/space/3.0.0.json', SpaceSchema],
  ['publications/story/3.0.0.json', StorySchema],
  ['publications/text-only/3.0.0.json', TextOnlySchema],
  ['publications/transaction/3.0.0.json', TransactionSchema],
  ['publications/video/3.0.0.json', VideoSchema],
]);

for (const [path, Schema] of schemas) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      AdvancedContractCondition: AdvancedContractConditionSchema,
      AccessCondition: AccessConditionSchema,
      PhysicalAddress: PhysicalAddressSchema,
      Amount: AmountSchema,
      AnyMedia: AnyMediaSchema,
      CollectCondition: CollectConditionSchema,
      EncryptedString: EncryptedStringSchema,
      EoaOwnershipCondition: EoaOwnershipConditionSchema,
      Erc20OwnershipCondition: Erc20OwnershipConditionSchema,
      EvmAddress: EvmAddressSchema,
      FollowCondition: FollowConditionSchema,
      GeoURI: GeoURISchema,
      MarketplaceMetadataAttribute: MarketplaceMetadataAttributeSchema,
      MediaAudio: MediaAudioSchema,
      MediaImage: MediaImageSchema,
      MediaVideo: MediaVideoSchema,
      MetadataAttribute: MetadataAttributeSchema,
      MetadataLicenseType: MetadataLicenseTypeSchema,
      NetworkAddress: NetworkAddressSchema,
      NftOwnershipCondition: NftOwnershipConditionSchema,
      ProfileId: ProfileIdSchema,
      ProfileOwnershipCondition: ProfileOwnershipConditionSchema,
      PublicationEncryptionStrategy: PublicationEncryptionStrategySchema,
      PublicationId: PublicationIdSchema,
      Tag: TagSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

// Profile schema
const others = new Map<string, z.ZodSchema<unknown>>([
  ['profile/2.0.0.json', ProfileMetadataSchema],
  ['publications/mirror/1.0.0.json', MirrorMetadataSchema],
]);

for (const [path, Schema] of others) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      MetadataAttribute: MetadataAttributeSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

// Module schema
const openActions = new Map<string, z.ZodSchema<unknown>>([
  ['module/1.0.0.json', ModuleMetadataSchema],
]);

for (const [path, Schema] of openActions) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      MetadataAttribute: MetadataAttributeSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}
