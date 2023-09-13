import { z } from 'zod';

import { PublicationEncryptionStrategySchema } from './encryption.js';
import { MarketplaceMetadataSchema } from './marketplace.js';
import { MetadataAttributeSchema } from '../../MetadataAttribute.js';
import {
  AppIdSchema,
  LocaleSchema,
  TagSchema,
  nonEmptyStringSchema,
  SignatureSchema,
  encryptableMarkdownSchema,
} from '../../primitives.js';
import { PublicationMainFocus } from '../PublicationMainFocus.js';

export * from './encryption.js';
export * from './license.js';
export * from './marketplace.js';
export * from './media.js';
export * from './timezones.js';

export enum PublicationContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}

/**
 * @internal
 */
export const MetadataCoreSchema = z.object(
  {
    id: nonEmptyStringSchema(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),

    hideFromFeed: z
      .boolean({
        description: 'Determine if the publication should not be shown in any feed.',
      })
      .optional(),

    globalReach: z
      .boolean({
        description:
          'Ability to only show when you filter on your App Id. ' +
          'This is useful for apps that want to show only their content on their apps.',
      })
      .optional(),

    appId: AppIdSchema.optional().describe('The App Id that this publication belongs to.'),
  },
  {
    description: 'The Lens operational metadata fields.',
  },
);

const MetadataCommonSchema = MetadataCoreSchema.extend({
  content: encryptableMarkdownSchema('Optional markdown content.').optional(),

  attributes: MetadataAttributeSchema.array()
    .min(1)
    .optional()
    .describe(
      'An optional bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
        'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
    ),

  locale: LocaleSchema,

  encryptedWith: PublicationEncryptionStrategySchema.optional(),

  tags: TagSchema.array().max(10).optional().describe('An arbitrary list of tags.'),

  contentWarning: z
    .nativeEnum(PublicationContentWarning, { description: 'Specify a content warning.' })
    .optional(),
}).describe('The common Lens specific metadata details.');

/**
 * @internal
 */
export function metadataDetailsWith<
  Augmentation extends { mainContentFocus: ReturnType<typeof mainContentFocus> },
>(augmentation: Augmentation) {
  return MetadataCommonSchema.extend(augmentation);
}

/**
 * @internal
 */
export function publicationWith<
  Augmentation extends {
    $schema: z.ZodLiteral<string>;
    lens: ReturnType<typeof metadataDetailsWith>;
  },
>(augmentation: Augmentation) {
  return MarketplaceMetadataSchema.extend({
    signature: SignatureSchema.optional(),
    ...augmentation,
  });
}

/**
 * @internal
 */
export function mainContentFocus(...focuses: [PublicationMainFocus, ...PublicationMainFocus[]]) {
  const description = 'The main focus of the publication.';
  if (focuses.length > 1) {
    const literals = focuses.map((value) => z.literal(value)) as [
      z.ZodLiteral<PublicationMainFocus>,
      z.ZodLiteral<PublicationMainFocus>,
      ...z.ZodLiteral<PublicationMainFocus>[],
    ];
    return z.union(literals, { description });
  }
  return z.literal(focuses[0], { description });
}
