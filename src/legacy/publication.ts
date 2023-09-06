/* eslint-disable no-case-declarations */
import { z } from 'zod';

import {
  AppIdSchema,
  LocaleSchema,
  Markdown,
  TagSchema,
  markdownSchema,
  notEmptyString,
  uriSchema,
} from '../primitives.js';
import { PublicationMainFocus as ExtendedPublicationMainFocus } from '../publication/PublicationMainFocus.js';
import {
  ConditionComparisonOperator,
  MarketplaceMetadataAttributeSchema,
  NftContractType,
  PublicationContentWarning,
} from '../publication/common';
import { hasTwoOrMore } from '../utils.js';

export enum PublicationMetadataVersion {
  V1 = '1.0.0',
  V2 = '2.0.0',
}

export enum PublicationMainFocus {
  ARTICLE = ExtendedPublicationMainFocus.ARTICLE,
  AUDIO = ExtendedPublicationMainFocus.AUDIO,
  EMBED = ExtendedPublicationMainFocus.EMBED,
  IMAGE = ExtendedPublicationMainFocus.IMAGE,
  LINK = ExtendedPublicationMainFocus.LINK,
  TEXT_ONLY = ExtendedPublicationMainFocus.TEXT_ONLY,
  VIDEO = ExtendedPublicationMainFocus.VIDEO,
}

export enum AudioMimeType {
  WAV = 'audio/wav',
  WAV_VND = 'audio/vnd.wave',
  MP3 = 'audio/mpeg',
  OGG_AUDIO = 'audio/ogg',
  MP4_AUDIO = 'audio/mp4',
  AAC = 'audio/aac',
  WEBM_AUDIO = 'audio/webm',
  FLAC = 'audio/flac',
}

export enum ImageMimeType {
  GIF = 'image/gif',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
  TIFF = 'image/tiff',
  X_MS_BMP = 'image/x-ms-bmp',
  SVG_XML = 'image/svg+xml',
  WEBP = 'image/webp',
  HEIC = 'image/heic',
}

export enum VideoMimeType {
  GLTF = 'model/gltf+json',
  GLTF_BINARY = 'model/gltf-binary',
  WEBM = 'video/webm',
  MP4 = 'video/mp4',
  M4V = 'video/x-m4v',
  OGV = 'video/ogv',
  OGG = 'video/ogg',
  MPEG = 'video/mpeg',
  QUICKTIME = 'video/quicktime',
  MOV = 'video/mov',
}

const AnimationUrlSchema = uriSchema(
  'In spec for OpenSea and other providers - also used when using EMBED main publication focus' +
    'A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, ' +
    'and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. ' +
    'Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, ' +
    'WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.',
);

const OpenSeaSchema = z.object({
  metadata_id: z.string({
    description:
      'The metadata_id can be anything but if your uploading to ipfs ' +
      'you will want it to be random. Using uuid could be an option!',
  }),

  description: markdownSchema(
    'A human-readable description of the item. It could be plain text or markdown.',
  )
    .optional()
    .nullable(),

  external_url: uriSchema(
    `This is the URL that will appear below the asset's image on OpenSea and others etc. ` +
      'and will allow users to leave OpenSea and view the item on the site.',
  ).optional(),

  name: notEmptyString('Name of the NFT item.'),

  attributes: MarketplaceMetadataAttributeSchema.array().describe(
    'These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.',
  ),

  image: uriSchema('Marketplaces will store any NFT image here.').optional().nullable(),

  animation_url: AnimationUrlSchema.optional().nullable(),

  version: z.nativeEnum(PublicationMetadataVersion),
});

const PublicationMetadataMediaSchema = z.object({
  item: uriSchema('Marketplaces will store any NFT image here.'),
  altTag: z.string().optional().nullable().describe('The alt tag for accessibility.'),
  cover: uriSchema('The cover for any video or audio media.').optional().nullable(),
  type: z.string().optional().nullable().describe('This is the mime type of the media.'),
});
export type PublicationMetadataMedia = z.infer<typeof PublicationMetadataMediaSchema>;

const ContentSchema = z
  .string({
    description: 'The content of a publication.',
  })
  .max(30000);

function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

function isEmptyArray<T>(value: T[] | null | undefined): value is [] | null | undefined {
  return isNullish(value) || value.length === 0;
}

function isEmptyString(value: string | null | undefined): value is '' | null | undefined {
  return isNullish(value) || value.length === 0;
}

const PublicationCommonSchema = OpenSeaSchema.extend({
  content: ContentSchema.transform((value) => value as Markdown)
    .optional()
    .nullable(),

  media: PublicationMetadataMediaSchema.array()
    .optional()
    .nullable()
    .describe('This is lens supported attached media items to the publication.'),

  appId: AppIdSchema.optional().nullable().describe('The App Id that this publication belongs to.'),
});

/**
 * @internal
 */
export const PublicationMetadataV1Schema = PublicationCommonSchema.extend({
  version: z.literal(PublicationMetadataVersion.V1, { description: 'The metadata version.' }),
}).superRefine((data, ctx) => {
  if (isEmptyString(data.content) && isNullish(data.image) && isEmptyArray(data.media)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['content'],
      message:
        'At least one between content, image, and media must be present. ' +
        'Content must be over 1 character.',
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['image'],
      message: 'At least one between content, image, and media must be present.',
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['media'],
      message: 'At least one between content, image, and media must be present.',
    });
  }
});
export type PublicationMetadataV1 = z.infer<typeof PublicationMetadataV1Schema>;

const CollectConditionSchema = z
  .object({
    collect: z.object({
      publicationId: z.string().nullable(),
      thisPublication: z.boolean().nullable(),
    }),
  })
  .strict();
export type CollectCondition = z.infer<typeof CollectConditionSchema>;

const EoaOwnershipSchema = z
  .object({
    eoa: z.object({
      address: z.string(),
    }),
  })
  .strict();
export type EoaOwnership = z.infer<typeof EoaOwnershipSchema>;

const FollowConditionSchema = z
  .object({
    follow: z.object({
      profileId: z.string(),
    }),
  })
  .strict();
export type FollowCondition = z.infer<typeof FollowConditionSchema>;

const NftOwnershipSchema = z
  .object({
    nft: z.object({
      contractAddress: z.string(),
      chainID: z.number(),
      contractType: z.nativeEnum(NftContractType),
      tokenIds: z.string().array().nonempty().nullable(),
    }),
  })
  .strict();
export type NftOwnership = z.infer<typeof NftOwnershipSchema>;

const ProfileOwnershipSchema = z
  .object({
    profile: z.object({
      profileId: z.string(),
    }),
  })
  .strict();
export type ProfileOwnership = z.infer<typeof ProfileOwnershipSchema>;

const Erc20OwnershipSchema = z
  .object({
    token: z.object({
      amount: z.string(),
      chainID: z.number(),
      condition: z.nativeEnum(ConditionComparisonOperator),
      contractAddress: z.string(),
      decimals: z.number(),
    }),
  })
  .strict();
export type Erc20Ownership = z.infer<typeof Erc20OwnershipSchema>;

export type AndCondition<T> = {
  and: {
    criteria: [T, T, ...T[]];
  };
};

function andCondition<
  Criteria extends [z.ZodType<unknown>, z.ZodType<unknown>, ...z.ZodType<unknown>[]],
>(options: Criteria): z.Schema<AndCondition<z.infer<Criteria[number]>>, z.ZodTypeDef, object> {
  return z
    .object({
      and: z.object({
        criteria: z
          .union(options)
          .array()
          .max(5, 'Invalid AND condition: should have at most 5 conditions')
          .refine(hasTwoOrMore, 'Invalid AND condition: should have at least 2 conditions'),
      }),
    })
    .strict();
}

export type OrCondition<T> = {
  or: {
    criteria: [T, T, ...T[]];
  };
};

function orCondition<
  Criteria extends [z.ZodType<unknown>, z.ZodType<unknown>, ...z.ZodType<unknown>[]],
>(options: Criteria): z.Schema<OrCondition<z.infer<Criteria[number]>>, z.ZodTypeDef, object> {
  return z
    .object({
      or: z.object({
        criteria: z
          .union(options)
          .array()
          .max(5, 'Invalid OR condition: should have at most 5 conditions')
          .refine(hasTwoOrMore, 'Invalid OR condition: should have at least 2 conditions'),
      }),
    })
    .strict();
}

const AccessConditionSchema = orCondition([
  CollectConditionSchema,
  EoaOwnershipSchema,
  FollowConditionSchema,
  NftOwnershipSchema,
  ProfileOwnershipSchema,
  Erc20OwnershipSchema,
  andCondition([
    CollectConditionSchema,
    EoaOwnershipSchema,
    FollowConditionSchema,
    NftOwnershipSchema,
    ProfileOwnershipSchema,
    Erc20OwnershipSchema,
  ]),
  orCondition([
    CollectConditionSchema,
    EoaOwnershipSchema,
    FollowConditionSchema,
    NftOwnershipSchema,
    ProfileOwnershipSchema,
    Erc20OwnershipSchema,
  ]),
]);
export type AccessCondition = z.infer<typeof AccessConditionSchema>;

const PublicationMetadataV2CommonSchema = PublicationCommonSchema.extend({
  version: z.literal(PublicationMetadataVersion.V2, { description: 'The metadata version.' }),

  locale: LocaleSchema,

  contentWarning: z
    .nativeEnum(PublicationContentWarning, { description: 'Specify a content warning.' })
    .optional(),

  mainContentFocus: z.nativeEnum(PublicationMainFocus, {
    description: 'Main content focus that for this publication.',
  }),

  tags: TagSchema.array()
    .max(10)
    .optional()
    .nullable()
    .describe('Ability to tag your publication.'),

  encryptionParams: z
    .object({
      accessCondition: AccessConditionSchema,
      encryptionKey: z.string().length(368, 'Encryption key should be 368 characters long.'),
      encryptedFields: z.object({}),
    })
    .optional(),
});

const PublicationMetadataV2ArticleSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.ARTICLE),

  content: ContentSchema.min(1).transform((value) => value as Markdown),
});
export type PublicationMetadataV2Article = z.infer<typeof PublicationMetadataV2ArticleSchema>;

const PublicationMetadataV2AudioSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.AUDIO),

  media: PublicationMetadataMediaSchema.array()
    .min(1)
    .refine(
      (value) => value.some((media) => media.type && media.type in AudioMimeType),
      `Metadata ${PublicationMainFocus.AUDIO} requires an audio to be attached.`,
    ),
});
export type PublicationMetadataV2Audio = z.infer<typeof PublicationMetadataV2AudioSchema>;

const PublicationMetadataV2EmbedSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.EMBED),

  animation_url: AnimationUrlSchema,
});
export type PublicationMetadataV2Embed = z.infer<typeof PublicationMetadataV2EmbedSchema>;

const PublicationMetadataV2ImageSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.IMAGE),

  media: PublicationMetadataMediaSchema.array()
    .min(1)
    .refine(
      (value) => value.some((media) => media.type && media.type in ImageMimeType),
      `Metadata ${PublicationMainFocus.IMAGE} requires an image to be attached.`,
    ),
});
export type PublicationMetadataV2Image = z.infer<typeof PublicationMetadataV2ImageSchema>;

const PublicationMetadataV2LinkSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.LINK),

  content: ContentSchema.min(1)
    .refine(
      (value) => value.includes('https://'),
      `Metadata ${PublicationMainFocus.LINK} requires a valid https link`,
    )
    .transform((value) => value as Markdown),
});
export type PublicationMetadataV2Link = z.infer<typeof PublicationMetadataV2LinkSchema>;

const PublicationMetadataV2TextOnlySchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.TEXT_ONLY),

  content: ContentSchema.min(1).transform((value) => value as Markdown),

  media: z
    .any()
    .array()
    .max(0, { message: 'Metadata TEXT cannot have media' })
    .optional()
    .nullable(),
});
export type PublicationMetadataV2TextOnly = z.infer<typeof PublicationMetadataV2TextOnlySchema>;

const PublicationMetadataV2VideoSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.VIDEO),

  media: PublicationMetadataMediaSchema.array()
    .min(1)
    .refine(
      (value) => value.some((media) => media.type && media.type in VideoMimeType),
      `Metadata ${PublicationMainFocus.VIDEO} requires an image to be attached.`,
    ),
});
export type PublicationMetadataV2Video = z.infer<typeof PublicationMetadataV2VideoSchema>;

/**
 * @internal
 */
export const PublicationMetadataV2Schema = z.discriminatedUnion('mainContentFocus', [
  PublicationMetadataV2ArticleSchema,
  PublicationMetadataV2AudioSchema,
  PublicationMetadataV2EmbedSchema,
  PublicationMetadataV2ImageSchema,
  PublicationMetadataV2LinkSchema,
  PublicationMetadataV2TextOnlySchema,
  PublicationMetadataV2VideoSchema,
]);
export type PublicationMetadataV2 = z.infer<typeof PublicationMetadataV2Schema>;

export type PublicationMetadata = PublicationMetadataV1 | PublicationMetadataV2;

/**
 * A union of Publication Metadata v1 ad v2.
 *
 * @example
 * with `parse`:
 * ```typescript
 * legacy.PublicationMetadataSchema.parse(valid); // => legacy.PublicationMetadata
 *
 * legacy.PublicationMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```typescript
 * legacy.PublicationMetadataSchema.safeParse(valid);
 * // => { success: true, data: legacy.PublicationMetadata }
 *
 * legacy.PublicationMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const PublicationMetadataSchema = z
  .object({
    // although not optional it will allow the refine function to provide better error message
    version: z.nativeEnum(PublicationMetadataVersion),
  })
  .passthrough()
  .superRefine((data, ctx): data is PublicationMetadata => {
    switch (data.version) {
      case PublicationMetadataVersion.V1:
        const v1Result = PublicationMetadataV1Schema.safeParse(data);

        if (!v1Result.success) {
          v1Result.error.issues.forEach((issue) => {
            ctx.addIssue(issue);
          });
        }
        break;

      case PublicationMetadataVersion.V2:
        const v2Result = PublicationMetadataV2Schema.safeParse(data);

        if (!v2Result.success) {
          v2Result.error.issues.forEach((issue) => {
            ctx.addIssue(issue);
          });
        }
        break;
    }

    return z.NEVER;
  });
