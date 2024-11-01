/* eslint-disable no-case-declarations */
import { v4 } from 'uuid';
import { z } from 'zod';

import * as latest from '../post';
import {
  ConditionComparisonOperator,
  NftContractType,
  PublicationContentWarning,
} from '../post/common';
import { LocaleSchema, Markdown, toMarkdown, NonEmptyStringSchema } from '../primitives.js';
import { marketplaceMetadataSchemaWith } from '../tokens/eip721.js';
import { Brand, hasTwoOrMore } from '../utils.js';

// re-export under legacy namespace
export { ConditionComparisonOperator, NftContractType, PublicationContentWarning };
export { MarketplaceMetadataAttributeDisplayType } from '../tokens/eip721.js';
export type { MarketplaceMetadataAttribute, MarketplaceMetadata } from '../tokens/eip721.js';
export type * from '../primitives.js';

export enum PublicationMetadataVersion {
  V1 = '1.0.0',
  V2 = '2.0.0',
}

export enum PublicationMainFocus {
  ARTICLE = latest.PostMainFocus.ARTICLE,
  AUDIO = latest.PostMainFocus.AUDIO,
  EMBED = latest.PostMainFocus.EMBED,
  IMAGE = latest.PostMainFocus.IMAGE,
  LINK = latest.PostMainFocus.LINK,
  SHORT_VIDEO = latest.PostMainFocus.SHORT_VIDEO,
  TEXT_ONLY = latest.PostMainFocus.TEXT_ONLY,
  VIDEO = latest.PostMainFocus.VIDEO,
}

export enum AudioMimeType {
  AAC = 'audio/aac',
  FLAC = 'audio/flac',
  MP3 = 'audio/mpeg',
  MP4_AUDIO = 'audio/mp4',
  OGG_AUDIO = 'audio/ogg',
  WAV = 'audio/wav',
  WAV_VND = 'audio/vnd.wave',
  WEBM_AUDIO = 'audio/webm',
}

const supportedAudioMimeTypes = Object.values(AudioMimeType);

function isSupportedAudioMimeTypes(value: unknown): value is AudioMimeType {
  return supportedAudioMimeTypes.includes(value as AudioMimeType);
}

export enum ImageMimeType {
  BMP = 'image/bmp',
  GIF = 'image/gif',
  HEIC = 'image/heic',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
  SVG_XML = 'image/svg+xml',
  TIFF = 'image/tiff',
  WEBP = 'image/webp',
  X_MS_BMP = 'image/x-ms-bmp',
}

const supportedImageMimeTypes = Object.values(ImageMimeType);

function isSupportedImageMimeType(value: unknown): value is ImageMimeType {
  return supportedImageMimeTypes.includes(value as ImageMimeType);
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

const supportedVideoMimeTypes = Object.values(VideoMimeType);

function isSupportedVideoMimeType(value: unknown): value is VideoMimeType {
  return supportedVideoMimeTypes.includes(value as VideoMimeType);
}

const AnimationUrlSchema = z.string({
  description:
    'In spec for OpenSea and other providers - also used when using EMBED main publication focus' +
    'A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, ' +
    'and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. ' +
    'Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, ' +
    'WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.',
});

/**
 * A unique Lens App identifier.
 */
export type AppId = Brand<string, 'AppId'>;
/**
 * @internal
 */
export function toAppId(value: string): AppId {
  return value as AppId;
}

// const OpenSeaSchema = z
//   .object({
//     description: z
//       .string({
//         description:
//           'A human-readable description of the item. It could be plain text or markdown.',
//       })
//       .optional()
//       .nullable()
//       .catch(null),

//     external_url: z
//       .string({
//         description:
//           `This is the URL that will appear below the asset's image on OpenSea and others etc. ` +
//           'and will allow users to leave OpenSea and view the item on the site.',
//       })
//       .optional()
//       .nullable(),

//     name: z.string({ description: 'Name of the NFT item.' }),

//     attributes: MarketplaceMetadataAttributeSchema.array()
//       .describe(
//         'These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.',
//       )
//       .catch([]),

//     image: z
//       .string({
//         description: 'Marketplaces will store any NFT image here.',
//       })
//       .optional()
//       .nullable()
//       .catch(null),

//     animation_url: AnimationUrlSchema.optional().nullable(),

//     version: z.nativeEnum(PublicationMetadataVersion),
//   })
//   .passthrough(); // loose validation for any unknown fields

/**
 * @internal
 */
export const MediaSchema = z
  .object({
    item: NonEmptyStringSchema.describe('Marketplaces will store any NFT image here.'), // it can be `This publication is gated.`
    altTag: z.string().optional().nullable().describe('The alt tag for accessibility.'),
    cover: z
      .string() // it can be `This publication is gated.`
      .describe('The cover for any video or audio media.')
      .nullable()
      .optional()
      .catch(null),
    type: z.string().optional().nullable().describe('This is the mime type of the media.'),
  })
  .passthrough(); // loose validation for media
export type Media = z.infer<typeof MediaSchema>;
/**
 * @deprecated Use `Media` instead.
 */
export type PublicationMetadataMedia = Media;

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

const PublicationCommonSchema = marketplaceMetadataSchemaWith({
  metadata_id: z
    .string({
      description:
        'The metadata_id can be anything but if your uploading to ipfs ' +
        'you will want it to be random. Using uuid could be an option!',
    })
    .catch(() => v4()),

  content: ContentSchema.transform((value) => value as Markdown)
    .optional()
    .nullable(),

  media: MediaSchema.array()
    .catch((ctx) => ctx.input.filter((media) => MediaSchema.safeParse(media).success) as Media[])
    .optional()
    .nullable()
    .describe('This is lens supported attached media items to the publication.'),

  appId: z
    .string()
    .max(200)
    .transform(toAppId)
    .optional()
    .nullable()
    .describe('The App Id that this publication belongs to.'),

  version: z.nativeEnum(PublicationMetadataVersion),
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
      thisPublication: z.boolean().nullable().optional(),
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
      tokenIds: z.string().array().min(1).nullable().optional().catch(null),
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
      amount: z.coerce.string(),
      chainID: z.coerce.number(),
      condition: z.nativeEnum(ConditionComparisonOperator),
      contractAddress: z.string(),
      decimals: z.coerce.number(),
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

const EncryptedMediaWithWrongShapeSchema = z
  .object({
    original: z.object({
      url: NonEmptyStringSchema,
      cover: z.string().nullable().optional().catch(null),
      altTag: z.string().nullable().optional().catch(null),
      mimeType: z.string().nullable().optional().catch(null),
    }),
  })
  .passthrough();

/**
 * @internal
 */
export const EncryptedMediaSchema = z
  .object({
    item: z.string().describe('Marketplaces will store any NFT image here.'),
    altTag: z.string().optional().nullable().describe('The alt tag for accessibility.'),
    cover: z.string().describe('The cover for any video or audio media.').optional().nullable(),
    type: z.string().optional().nullable().describe('This is the mime type of the media.'),
  })
  .passthrough()
  .catch((ctx) => {
    const result = EncryptedMediaWithWrongShapeSchema.safeParse(ctx.input);

    if (result.success) {
      return {
        item: result.data.original.url,
        altTag: result.data.original.altTag,
        cover: result.data.original.cover,
        type: result.data.original.mimeType,
      };
    }

    return ctx.input;
  });
export type EncryptedMedia = z.infer<typeof EncryptedMediaSchema>;

const EncryptedFieldsSchema = z.object({
  content: z.string().optional().nullable(),
  media: EncryptedMediaSchema.array().optional().nullable(),
  image: z.string().optional().nullable(),
  animation_url: z.string().optional().nullable(),
  external_url: z.string().optional().nullable(),
});
export type EncryptedFields = z.infer<typeof EncryptedFieldsSchema>;

/**
 * @internal
 */
export const EncryptionParamsSchema = z.object({
  accessCondition: AccessConditionSchema,
  encryptedFields: EncryptedFieldsSchema,
  providerSpecificParams: z.object({
    encryptionKey: z.string().length(368, 'Encryption key should be 368 characters long.'),
  }),
});
export type EncryptionParams = z.infer<typeof EncryptionParamsSchema>;

const PublicationMetadataV2CommonSchema = PublicationCommonSchema.extend({
  version: z.literal(PublicationMetadataVersion.V2, { description: 'The metadata version.' }),

  locale: LocaleSchema,

  content: ContentSchema.transform(toMarkdown).optional().nullable(),

  contentWarning: z
    .nativeEnum(PublicationContentWarning, { description: 'Specify a content warning.' })
    .optional()
    .nullable()
    .catch(null),

  mainContentFocus: z.nativeEnum(PublicationMainFocus, {
    description: 'Main content focus that for this publication.',
  }),

  tags: z.string().array().optional().nullable().describe('Ability to tag your publication.'),

  encryptionParams: EncryptionParamsSchema.optional(),
});

const PublicationMetadataV2ArticleSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.ARTICLE),

  content: ContentSchema.min(1).transform(toMarkdown),
});
export type PublicationMetadataV2Article = z.infer<typeof PublicationMetadataV2ArticleSchema>;

const PublicationMetadataV2AudioSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.AUDIO),

  media: MediaSchema.array()
    .min(1)
    .catch((ctx) => ctx.input.filter((media) => MediaSchema.safeParse(media).success) as Media[])
    .refine(
      (value) => value.some((media) => isSupportedAudioMimeTypes(media?.type)),
      `Metadata ${PublicationMainFocus.AUDIO} requires an audio to be attached.`,
    ),
});
export type PublicationMetadataV2Audio = z.infer<typeof PublicationMetadataV2AudioSchema>;

const PublicationMetadataV2EmbedSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.EMBED),

  animation_url: AnimationUrlSchema.optional().nullable(), // should not really be null but some publications have it as null
});
export type PublicationMetadataV2Embed = z.infer<typeof PublicationMetadataV2EmbedSchema>;

const PublicationMetadataV2ImageSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.IMAGE),

  media: MediaSchema.array()
    .min(1)
    .catch((ctx) => ctx.input.filter((media) => MediaSchema.safeParse(media).success) as Media[])
    .refine(
      (value) => value.some((media) => isSupportedImageMimeType(media.type)),
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

const PublicationMetadataV2BaseVideoSchema = PublicationMetadataV2CommonSchema.extend({
  mainContentFocus: z.union([
    z.literal(PublicationMainFocus.VIDEO),
    z.literal(PublicationMainFocus.SHORT_VIDEO),
  ]),

  media: MediaSchema.array()
    .min(1)
    .catch((ctx) => ctx.input.filter((media) => MediaSchema.safeParse(media).success) as Media[])
    .refine(
      (value) => value.some((media) => isSupportedVideoMimeType(media.type)),
      `Metadata ${PublicationMainFocus.VIDEO} requires an image to be attached.`,
    ),
});
const PublicationMetadataV2VideoSchema = PublicationMetadataV2BaseVideoSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.VIDEO),
});
const PublicationMetadataV2ShortVideoSchema = PublicationMetadataV2BaseVideoSchema.extend({
  mainContentFocus: z.literal(PublicationMainFocus.SHORT_VIDEO),
});

export type PublicationMetadataV2Video = z.infer<typeof PublicationMetadataV2VideoSchema>;

/**
 * @internal
 */
export const PublicationMetadataV2Schema = z
  .discriminatedUnion('mainContentFocus', [
    PublicationMetadataV2ArticleSchema,
    PublicationMetadataV2AudioSchema,
    PublicationMetadataV2EmbedSchema,
    PublicationMetadataV2ImageSchema,
    PublicationMetadataV2LinkSchema,
    PublicationMetadataV2TextOnlySchema,
    PublicationMetadataV2VideoSchema,
    PublicationMetadataV2ShortVideoSchema,
  ])
  .transform((data) => {
    if (data.mainContentFocus === PublicationMainFocus.VIDEO && data.appId === 'lenstube-bytes') {
      return {
        ...data,
        mainContentFocus: PublicationMainFocus.SHORT_VIDEO,
      };
    }
    return data;
  });
export type PublicationMetadataV2 = z.infer<typeof PublicationMetadataV2Schema>;

export type PublicationMetadata = PublicationMetadataV1 | PublicationMetadataV2;

/**
 * A union of Publication Metadata v1 ad v2.
 *
 * @example
 * with `parse`:
 * ```ts
 * legacy.PublicationMetadataSchema.parse(valid); // => legacy.PublicationMetadata
 *
 * legacy.PublicationMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```ts
 * legacy.PublicationMetadataSchema.safeParse(valid);
 * // => { success: true, data: legacy.PublicationMetadata }
 *
 * legacy.PublicationMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const PublicationMetadataSchema: z.ZodType<PublicationMetadata, z.ZodTypeDef, object> = z
  .object({
    // although not optional it will allow the refine function to provide better error message
    version: z.nativeEnum(PublicationMetadataVersion),
  })
  .passthrough()
  .transform((data, ctx) => {
    switch (data.version) {
      case PublicationMetadataVersion.V1:
        const v1Result = PublicationMetadataV1Schema.safeParse(data);

        if (!v1Result.success) {
          v1Result.error.issues.forEach((issue) => {
            ctx.addIssue(issue);
          });
          return z.NEVER;
        }
        return v1Result.data;

      case PublicationMetadataVersion.V2:
        const v2Result = PublicationMetadataV2Schema.safeParse(data);

        if (!v2Result.success) {
          v2Result.error.issues.forEach((issue) => {
            ctx.addIssue(issue);
          });
          return z.NEVER;
        }

        return v2Result.data;
    }
  });
