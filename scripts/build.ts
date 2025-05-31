#!/usr/bin/env -S npx tsx

import { join } from 'node:path';

import fs from 'fs-extra';
import type { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import {
  AccountMetadataSchema,
  ActionMetadataSchema,
  AnyMediaSchema,
  AppMetadataSchema,
  ArticleSchema,
  AudioSchema,
  ChainIdSchema,
  CheckingInSchema,
  ContentWarningSchema,
  ContractKeyValuePairDescriptorSchema,
  EmbedSchema,
  EventSchema,
  EvmAddressSchema,
  FeedMetadataSchema,
  FeedRuleMetadataSchema,
  GeoURISchema,
  GraphMetadataSchema,
  GraphRuleMetadataSchema,
  GroupMetadataSchema,
  GroupRuleMetadataSchema,
  ImageSchema,
  LinkSchema,
  LiveStreamSchema,
  LocaleSchema,
  MarkdownSchema,
  MediaAudioSchema,
  MediaImageSchema,
  MediaVideoSchema,
  MetadataAttributeSchema,
  MetadataIdSchema,
  MetadataLicenseTypeSchema,
  MintSchema,
  CustomSchema,
  NamespaceMetadataSchema,
  NamespaceRuleMetadataSchema,
  Nft721MetadataAttributeSchema,
  NonEmptyStringSchema,
  PhysicalAddressSchema,
  PostMainFocusSchema,
  PostMetadataSchema,
  RuleMetadataSchema,
  SignatureSchema,
  SpaceSchema,
  SponsorshipMetadataSchema,
  StorySchema,
  TagSchema,
  TextOnlySchema,
  ThreeDSchema,
  TransactionSchema,
  URISchema,
  VideoSchema,
} from '../src';
import { FollowRuleMetadataSchema } from '../src/rule/FollowRuleMetadataSchema';
import { PostRuleMetadataSchema } from '../src/rule/PostRuleMetadataSchema';

const outputDir = 'jsonschemas';

await fs.ensureDir(outputDir);

// Post schemas
const schemas = new Map<string, z.ZodSchema<unknown>>([
  ['posts/3d/3.0.0.json', ThreeDSchema],
  ['posts/article/3.0.0.json', ArticleSchema],
  ['posts/audio/3.0.0.json', AudioSchema],
  ['posts/checking-in/3.0.0.json', CheckingInSchema],
  ['posts/embed/3.0.0.json', EmbedSchema],
  ['posts/event/3.0.0.json', EventSchema],
  ['posts/image/3.0.0.json', ImageSchema],
  ['posts/link/3.0.0.json', LinkSchema],
  ['posts/livestream/3.0.0.json', LiveStreamSchema],
  ['posts/mint/3.0.0.json', MintSchema],
  ['posts/custom/3.0.0.json', CustomSchema],
  ['posts/space/3.0.0.json', SpaceSchema],
  ['posts/story/3.0.0.json', StorySchema],
  ['posts/text-only/3.0.0.json', TextOnlySchema],
  ['posts/transaction/3.0.0.json', TransactionSchema],
  ['posts/video/3.0.0.json', VideoSchema],
]);

for (const [path, Schema] of schemas) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      Markdown: MarkdownSchema,
      URI: URISchema,
      AnyMedia: AnyMediaSchema,
      ChainId: ChainIdSchema,
      EvmAddress: EvmAddressSchema,
      GeoURI: GeoURISchema,
      MarketplaceMetadataAttribute: Nft721MetadataAttributeSchema,
      MediaAudio: MediaAudioSchema,
      MediaImage: MediaImageSchema,
      MediaVideo: MediaVideoSchema,
      MetadataAttribute: MetadataAttributeSchema,
      MetadataLicenseType: MetadataLicenseTypeSchema,
      PhysicalAddress: PhysicalAddressSchema,
      Tag: TagSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

// Umbrella schema
await generateUmbrellaSchema();

// Other schemas
const others = new Map<string, z.ZodSchema<unknown>>([
  ['account/1.0.0.json', AccountMetadataSchema],
  ['app/1.0.0.json', AppMetadataSchema],
  ['feed/1.0.0.json', FeedMetadataSchema],
  ['graph/1.0.0.json', GraphMetadataSchema],
  ['group/1.0.0.json', GroupMetadataSchema],
  ['namespace/1.0.0.json', NamespaceMetadataSchema],
  ['sponsorship/1.0.0.json', SponsorshipMetadataSchema],
]);

for (const [path, Schema] of others) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      URI: URISchema,
      Markdown: MarkdownSchema,
      MetadataAttribute: MetadataAttributeSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

// Modules schemas
const modules = new Map<string, z.ZodSchema<unknown>>([
  ['action/1.0.0.json', ActionMetadataSchema],
  ['rules/feed/1.0.0.json', FeedRuleMetadataSchema],
  ['rules/follow/1.0.0.json', FollowRuleMetadataSchema],
  ['rules/graph/1.0.0.json', GraphRuleMetadataSchema],
  ['rules/group/1.0.0.json', GroupRuleMetadataSchema],
  ['rules/namespace/1.0.0.json', NamespaceRuleMetadataSchema],
  ['rules/post/1.0.0.json', PostRuleMetadataSchema],
]);

for (const [path, Schema] of modules) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      MetadataAttribute: MetadataAttributeSchema,
      ContractKeyValuePairDescriptor: ContractKeyValuePairDescriptorSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

async function generateUmbrellaSchema() {
  const outputFile = join(outputDir, 'schema.json');

  await fs.ensureFile(outputFile);

  const jsonSuperSchema = zodToJsonSchema(PostMetadataSchema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    $refStrategy: 'root',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      Markdown: MarkdownSchema,
      URI: URISchema,
      MainContentFocus: PostMainFocusSchema,
      AnyMedia: AnyMediaSchema,
      ChainId: ChainIdSchema,
      EvmAddress: EvmAddressSchema,
      GeoURI: GeoURISchema,
      Locale: LocaleSchema,
      MarketplaceMetadataAttribute: Nft721MetadataAttributeSchema,
      MediaAudio: MediaAudioSchema,
      MediaImage: MediaImageSchema,
      MediaVideo: MediaVideoSchema,
      MetadataAttribute: MetadataAttributeSchema,
      MetadataId: MetadataIdSchema,
      MetadataLicenseType: MetadataLicenseTypeSchema,
      PhysicalAddress: PhysicalAddressSchema,
      ContentWarning: ContentWarningSchema,
      Signature: SignatureSchema,
      Tag: TagSchema,
      // Post schemas
      ArticleMetadata: ArticleSchema,
      AudioMetadata: AudioSchema,
      CheckingInMetadata: CheckingInSchema,
      EmbedMetadata: EmbedSchema,
      EventMetadata: EventSchema,
      ImageMetadata: ImageSchema,
      LinkMetadata: LinkSchema,
      LiveStreamMetadata: LiveStreamSchema,
      MintMetadata: MintSchema,
      CustomMetadata: CustomSchema,
      SpaceMetadata: SpaceSchema,
      TextOnlyMetadata: TextOnlySchema,
      StoryMetadata: StorySchema,
      TransactionMetadata: TransactionSchema,
      ThreeDMetadata: ThreeDSchema,
      VideoMetadata: VideoSchema,
      // Account schemas
      AccountMetadata: AccountMetadataSchema,
      // Primitives schemas
      AppMetadata: AppMetadataSchema,
      GraphMetadata: GraphMetadataSchema,
      FeedMetadata: FeedMetadataSchema,
      GroupMetadata: GroupMetadataSchema,
      SponsorshipMetadata: SponsorshipMetadataSchema,
      NamespaceMetadata: NamespaceMetadataSchema,
      // Actions schemas
      ActionMetadata: ActionMetadataSchema,
      // Rules schemas
      RuleMetadata: RuleMetadataSchema,
      ContractKeyValuePairDescriptor: ContractKeyValuePairDescriptorSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSuperSchema, { spaces: 2 });
}
