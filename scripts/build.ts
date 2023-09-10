import { join } from 'path';

import fs from 'fs-extra';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import {
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
  NetworkAddressSchema,
  NftOwnershipConditionSchema,
  ProfileMetadataSchema,
  ProfileOwnershipConditionSchema,
  PublicationEncryptionStrategySchema,
  SpaceSchema,
  StorySchema,
  TextOnlySchema,
  ThreeDMetadataSchema,
  TransactionSchema,
  VideoSchema,
  ProfileIdSchema,
  EvmAddressSchema,
  AccessConditionSchema,
  PublicationIdSchema,
  AmountSchema,
  TagSchema,
  MirrorMetadataSchema,
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
  ['publications/mirror/1.0.0.json', MirrorMetadataSchema],
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
      AccessCondition: AccessConditionSchema,
      Amount: AmountSchema,
      AnyMedia: AnyMediaSchema,
      CollectCondition: CollectConditionSchema,
      EoaOwnershipCondition: EoaOwnershipConditionSchema,
      Erc20OwnershipCondition: Erc20OwnershipConditionSchema,
      EvmAddress: EvmAddressSchema,
      FollowCondition: FollowConditionSchema,
      GeoLocation: GeoLocationSchema,
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
