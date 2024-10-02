#!/usr/bin/env -S npx tsx

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
  EncryptableUriSchema,
  ChainIdSchema,
} from '../src';
import { ModuleMetadataSchema } from '../src/module';

const outputDir = 'jsonschemas';

await fs.ensureDir(outputDir);

// Publication schemas
const schemas = new Map<string, [z.ZodSchema<unknown>, string]>([
  ['publications/3d/3.0.0.json', [ThreeDSchema, 'ThreeD']],
  ['publications/article/3.0.0.json', [ArticleSchema, 'Article']],
  ['publications/audio/3.0.0.json', [AudioSchema, 'Audio']],
  ['publications/checking-in/3.0.0.json', [CheckingInSchema, 'CheckingIn']],
  ['publications/embed/3.0.0.json', [EmbedSchema, 'Embed']],
  ['publications/event/3.0.0.json', [EventSchema, 'Event']],
  ['publications/image/3.0.0.json', [ImageSchema, 'Image']],
  ['publications/link/3.0.0.json', [LinkSchema, 'Link']],
  ['publications/livestream/3.0.0.json', [LiveStreamSchema, 'LiveStream']],
  ['publications/mint/3.0.0.json', [MintSchema, 'Mint']],
  ['publications/space/3.0.0.json', [SpaceSchema, 'Space']],
  ['publications/story/3.0.0.json', [StorySchema, 'Story']],
  ['publications/text-only/3.0.0.json', [TextOnlySchema, 'TextOnly']],
  ['publications/transaction/3.0.0.json', [TransactionSchema, 'Transaction']],
  ['publications/video/3.0.0.json', [VideoSchema, 'Video']],
]);

for (const [path, [Schema, name]] of schemas) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    name,
    definitionPath: '$defs',
    $refStrategy: 'none',
    definitions: {
      AccessCondition: AccessConditionSchema,
      AdvancedContractCondition: AdvancedContractConditionSchema,
      Amount: AmountSchema,
      AnyMedia: AnyMediaSchema,
      ChainId: ChainIdSchema,
      CollectCondition: CollectConditionSchema,
      EncryptableUri: EncryptableUriSchema,
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
      PhysicalAddress: PhysicalAddressSchema,
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
