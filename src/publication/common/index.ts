import { z } from 'zod';

import {
  PublicationEncryptionStrategy,
  PublicationEncryptionStrategySchema,
} from './encryption.js';
import { MarketplaceMetadataSchema } from './marketplace.js';
import { MetadataAttribute, MetadataAttributeSchema } from '../../MetadataAttribute.js';
import {
  AppIdSchema,
  LocaleSchema,
  TagSchema,
  nonEmptyStringSchema,
  SignatureSchema,
  AppId,
  Locale,
  Tag,
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
 * Common fields of a Lens primary publication.
 */
export type PublicationMetadataCommon = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * Use a UUID if unsure.
   */
  id: string;
  /**
   * The App Id that this publication belongs to.
   */
  appId?: AppId;
  /**
   * Determine if the publication should not be shown in any feed.
   *
   * @defaultValue false
   */
  hideFromFeed?: boolean;
  /**
   * A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.
   * Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.
   */
  attributes?: MetadataAttribute[];
  /**
   * The locale of the metadata.
   */
  locale: Locale;
  /**
   * The encryption strategy used to encrypt the publication.
   *
   * If not present, the publication is presumed to be unencrypted.
   */
  encryptedWith?: PublicationEncryptionStrategy;
  /**
   * An arbitrary list of tags.
   */
  tags?: Tag[];
  /**
   * Specify a content warning.
   */
  contentWarning?: PublicationContentWarning;
};

const PublicationMetadataCommonSchema = z.object({
  id: nonEmptyStringSchema(
    'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
  ),

  appId: AppIdSchema.optional().describe('The App Id that this publication belongs to.'),

  hideFromFeed: z
    .boolean({
      description: 'Determine if the publication should not be shown in any feed.',
    })
    .optional(),

  attributes: MetadataAttributeSchema.array()
    .min(1)
    .max(20)
    .optional()
    .describe(
      'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
        'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
    ),

  locale: LocaleSchema,

  encryptedWith: PublicationEncryptionStrategySchema.optional(),

  tags: z
    .set(TagSchema) // z.set(...) sets uniqueItems: true in generated JSON Schemas
    .max(20)
    .catch((ctx) => ctx.input as Set<Tag>)
    .superRefine((input, ctx) => {
      // but needs to be corrected in code
      const result = z.array(TagSchema).max(20).safeParse(input);

      if (result.success) {
        const uniqueTags = [...new Set(result.data)];
        if (result.data.length > uniqueTags.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            fatal: true,
            message: `Duplicate tags are not allowed: ${result.data.join(', ')}`,
          });
        }
        return z.NEVER;
      }

      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue);
      });
    })
    .transform((value) => [...value]) // type coercion
    .optional()
    .describe('An arbitrary list of tags.'),

  contentWarning: z
    .nativeEnum(PublicationContentWarning, { description: 'Specify a content warning.' })
    .optional(),
});

/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
export function metadataDetailsWith<
  Augmentation extends {
    mainContentFocus:
      | z.ZodLiteral<PublicationMainFocus>
      | z.ZodUnion<[z.ZodLiteral<PublicationMainFocus>, ...z.ZodLiteral<PublicationMainFocus>[]]>;
  },
>(augmentation: Augmentation) {
  return PublicationMetadataCommonSchema.extend(augmentation);
}

/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
export function publicationWith<
  Augmentation extends {
    $schema: z.ZodType;
    lens: ReturnType<typeof metadataDetailsWith>;
  },
>(augmentation: Augmentation) {
  return MarketplaceMetadataSchema.extend({
    signature: SignatureSchema.optional(),
    ...augmentation,
  });
}

/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
export function mainContentFocus<T extends PublicationMainFocus>(focus: T): z.ZodLiteral<T>;
export function mainContentFocus<T extends PublicationMainFocus, O extends PublicationMainFocus>(
  ...focuses: [T, O]
): z.ZodUnion<[z.ZodLiteral<T>, z.ZodLiteral<O>]>;
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
