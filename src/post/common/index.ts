import { z } from 'zod';

import { type MetadataAttribute, MetadataAttributeSchema } from '../../MetadataAttribute.js';
import {
  type Locale,
  LocaleSchema,
  NonEmptyStringSchema,
  SignatureSchema,
  type Tag,
  TagSchema,
} from '../../primitives.js';
import { nftMetadataSchemaWith } from '../../tokens/eip721.js';
import type { PostMainFocus } from '../PostMainFocus.js';

export * from './license.js';
export * from './media.js';
export * from './timezones.js';

export enum ContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}

export const MetadataIdSchema = NonEmptyStringSchema.describe(
  'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
);

export const ContentWarningSchema = z.nativeEnum(ContentWarning, {
  description: 'Specify a content warning.',
});

/**
 * Common fields of a Lens post.
 */
export type PostMetadataCommon = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * Use a UUID if unsure.
   */
  id: string;
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
   * An arbitrary list of tags.
   */
  tags?: Tag[];
  /**
   * Specify a content warning.
   */
  contentWarning?: ContentWarning;
};

/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
export function metadataDetailsWith<
  Augmentation extends {
    mainContentFocus:
      | z.ZodLiteral<PostMainFocus>
      | z.ZodUnion<[z.ZodLiteral<PostMainFocus>, ...z.ZodLiteral<PostMainFocus>[]]>
      | z.ZodNativeEnum<typeof PostMainFocus>;
  },
>(augmentation: Augmentation) {
  return z
    .object({
      id: MetadataIdSchema,

      attributes: MetadataAttributeSchema.array()
        .min(1)
        .max(20)
        .optional()
        .describe(
          'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
            'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
        ),

      locale: LocaleSchema,

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

          for (const issue of result.error.issues) {
            ctx.addIssue(issue);
          }
        })
        .transform((value) => [...value]) // type coercion
        .optional()
        .describe('An arbitrary list of tags.'),

      contentWarning: ContentWarningSchema.optional(),
    })
    .extend(augmentation);
}

/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
export function postWith<
  Augmentation extends {
    $schema: z.ZodLiteral<string>;
    lens: ReturnType<typeof metadataDetailsWith>;
  },
>(augmentation: Augmentation) {
  return nftMetadataSchemaWith({
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
export function mainContentFocus<T extends PostMainFocus>(focus: T): z.ZodLiteral<T>;
export function mainContentFocus<T extends PostMainFocus, O extends PostMainFocus>(
  ...focuses: [T, O]
): z.ZodUnion<[z.ZodLiteral<T>, z.ZodLiteral<O>]>;
export function mainContentFocus(...focuses: [PostMainFocus, ...PostMainFocus[]]) {
  const description = 'The main focus of the post.';
  if (focuses.length > 1) {
    const literals = focuses.map((value) => z.literal(value)) as [
      z.ZodLiteral<PostMainFocus>,
      z.ZodLiteral<PostMainFocus>,
      ...z.ZodLiteral<PostMainFocus>[],
    ];
    return z.union(literals, { description });
  }
  return z.literal(focuses[0], { description });
}
