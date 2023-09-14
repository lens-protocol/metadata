import { v4 } from 'uuid';
import { z } from 'zod';

import { formatZodError } from './formatters';
import { ProfileMetadata, ProfileMetadataSchema, ProfileSchemaId } from './profile';
import {
  ThreeDMetadata,
  ThreeDSchema,
  ArticleMetadata,
  ArticleSchema,
  AudioMetadata,
  AudioSchema,
  CheckingInMetadata,
  CheckingInSchema,
  EmbedMetadata,
  EmbedSchema,
  EventMetadata,
  EventSchema,
  ImageMetadata,
  ImageSchema,
  LinkMetadata,
  LinkSchema,
  LivestreamMetadata,
  LivestreamSchema,
  MintMetadata,
  MintSchema,
  MirrorMetadata,
  MirrorMetadataSchema,
  PublicationMainFocus,
  PublicationSchemaId,
  SpaceMetadata,
  SpaceSchema,
  StoryMetadata,
  StorySchema,
  TextOnlyMetadata,
  TextOnlySchema,
  TransactionMetadata,
  TransactionSchema,
  VideoMetadata,
  VideoSchema,
  MarketplaceMetadata,
  PublicationMetadata,
  MirrorSchemaId,
} from './publication';
import { Brand, Overwrite, Prettify } from './utils.js';

export class ValidationError extends Error {
  name = 'ValidationError' as const;
}

/**
 * @internal
 */
export type BrandOf<A> = [A] extends [Brand<unknown, infer R>] ? R : never;

/**
 * @internal
 */
export type UnbrandAll<T> = T extends Brand<infer R, BrandOf<T>>
  ? R
  : {
      [K in keyof T]: UnbrandAll<T[K]>;
    };

/**
 * @internal
 */
export type ExtractLensSpec<T extends { lens: unknown }> = T['lens'];

/**
 * @internal
 */
export type OmitInferredPublicationFields<T> = Omit<T, 'mainContentFocus'>;

/**
 * @internal
 */
export type PublicationDefaults<Details extends ExtractLensSpec<PublicationMetadata>> = Overwrite<
  Details,
  {
    /**
     * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
     *
     * @defaultValue a UUID
     */
    id?: string;
    /**
     * The language of the publication.
     *
     * It's a locale string in the format of `<language>-<region>` or just `<language>`, where:
     * - `language` is a two-letter ISO 639-1 language code, e.g. `en` or `it`
     * - `region` is a two-letter ISO 3166-1 alpha-2 region code, e.g. `US` or `IT`
     *
     * You can just pass in the language tag if you do not know the region or don't need to be specific.
     *
     * @defaultValue `en`
     */
    locale?: string;
  }
>;

/**
 * @internal
 */
export type PublicationMetadataOptions<
  Metadata extends PublicationMetadata,
  Details extends ExtractLensSpec<Metadata> = ExtractLensSpec<Metadata>,
> = Prettify<
  UnbrandAll<OmitInferredPublicationFields<PublicationDefaults<Details>>> & {
    marketplace?: MarketplaceMetadata;
  }
>;

function process<Input, Output>(result: z.SafeParseReturnType<Input, Output>): Output {
  if (result.success) {
    return result.data;
  }
  throw new ValidationError(formatZodError(result.error));
}

/**
 * @category Compose
 */
export type ArticleOptions = PublicationMetadataOptions<ArticleMetadata>;
/**
 * Creates a valid ArticleMetadata.
 *
 * @category Compose
 * @param input - {@link ArticleOptions}
 */
export function article({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: ArticleOptions): PublicationMetadata {
  return process(
    ArticleSchema.safeParse({
      $schema: PublicationSchemaId.ARTICLE_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.ARTICLE,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type AudioOptions = PublicationMetadataOptions<AudioMetadata>;
/**
 * Creates a valid AudioMetadata.
 *
 * @category Compose
 * @param input - {@link AudioOptions}
 */
export function audio({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: AudioOptions): AudioMetadata {
  return process(
    AudioSchema.safeParse({
      $schema: PublicationSchemaId.AUDIO_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.AUDIO,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type CheckingInOptions = PublicationMetadataOptions<CheckingInMetadata>;
/**
 * Creates a valid CheckingInMetadata.
 *
 * @category Compose
 * @param input - {@link CheckingInOptions}
 */
export function checkingIn({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: CheckingInOptions): CheckingInMetadata {
  return process(
    CheckingInSchema.safeParse({
      $schema: PublicationSchemaId.CHECKING_IN_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.CHECKING_IN,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type EmbedOptions = PublicationMetadataOptions<EmbedMetadata>;
/**
 * Creates a valid EmbedMetadata.
 *
 * @category Compose
 * @param input - {@link EmbedOptions}
 */
export function embed({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: EmbedOptions): EmbedMetadata {
  return process(
    EmbedSchema.safeParse({
      $schema: PublicationSchemaId.EMBED_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.EMBED,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type EventOptions = PublicationMetadataOptions<EventMetadata>;
/**
 * Creates a valid EventMetadata.
 *
 * @category Compose
 * @param input - {@link EventOptions}
 */
export function event({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: EventOptions): EventMetadata {
  return process(
    EventSchema.safeParse({
      $schema: PublicationSchemaId.EVENT_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.EVENT,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type ImageOptions = PublicationMetadataOptions<ImageMetadata>;
/**
 * Creates a valid ImageMetadata.
 *
 * @category Compose
 * @param input - {@link ImageOptions}
 */
export function image({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: ImageOptions): ImageMetadata {
  return process(
    ImageSchema.safeParse({
      $schema: PublicationSchemaId.IMAGE_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.IMAGE,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type LinkOptions = PublicationMetadataOptions<LinkMetadata>;
/**
 * Creates a valid LinkMetadata.
 *
 * @category Compose
 * @param input - {@link LinkOptions}
 */
export function link({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: LinkOptions): LinkMetadata {
  return process(
    LinkSchema.safeParse({
      $schema: PublicationSchemaId.LINK_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.LINK,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type LivestreamOptions = PublicationMetadataOptions<LivestreamMetadata>;
/**
 * Creates a valid LivestreamMetadata.
 *
 * @category Compose
 * @param input - {@link LivestreamOptions}
 */
export function livestream({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: LivestreamOptions): LivestreamMetadata {
  return process(
    LivestreamSchema.safeParse({
      $schema: PublicationSchemaId.LIVESTREAM_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.LIVESTREAM,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type MintOptions = PublicationMetadataOptions<MintMetadata>;
/**
 * Creates a valid MintMetadata.
 *
 * @category Compose
 * @param input - {@link MintOptions}
 */
export function mint({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: MintOptions): MintMetadata {
  return process(
    MintSchema.safeParse({
      $schema: PublicationSchemaId.MINT_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.MINT,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type SpaceOptions = PublicationMetadataOptions<SpaceMetadata>;
/**
 * Creates a valid SpaceMetadata.
 *
 * @category Compose
 * @param input - {@link SpaceOptions}
 */
export function space({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: SpaceOptions): SpaceMetadata {
  return process(
    SpaceSchema.safeParse({
      $schema: PublicationSchemaId.SPACE_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.SPACE,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type StoryOptions = PublicationMetadataOptions<StoryMetadata>;
/**
 * Creates a valid StoryMetadata.
 *
 * @category Compose
 * @param input - {@link StoryOptions}
 */
export function story({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: StoryOptions): StoryMetadata {
  return process(
    StorySchema.safeParse({
      $schema: PublicationSchemaId.STORY_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.STORY,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type TextOnlyOptions = PublicationMetadataOptions<TextOnlyMetadata>;
/**
 * Creates a valid TextOnlyMetadata.
 *
 * @category Compose
 * @param input - {@link TextOnlyOptions}
 */
export function textOnly({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: TextOnlyOptions): TextOnlyMetadata {
  return process(
    TextOnlySchema.safeParse({
      $schema: PublicationSchemaId.TEXT_ONLY_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.TEXT_ONLY,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type ThreeDOptions = PublicationMetadataOptions<ThreeDMetadata>;
/**
 * Creates a valid ThreeDMetadata.
 *
 * @category Compose
 * @param input - {@link ThreeDOptions}
 */
export function threeD({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: ThreeDOptions): ThreeDMetadata {
  return process(
    ThreeDSchema.safeParse({
      $schema: PublicationSchemaId.THREE_D_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.THREE_D,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type TransactionOptions = PublicationMetadataOptions<TransactionMetadata>;
/**
 * Creates a valid TransactionMetadata.
 *
 * @category Compose
 * @param input - {@link TransactionOptions}
 */
export function transaction({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: TransactionOptions): TransactionMetadata {
  return process(
    TransactionSchema.safeParse({
      $schema: PublicationSchemaId.TRANSACTION_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.TRANSACTION,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type VideoOptions = PublicationMetadataOptions<VideoMetadata>;
/**
 * Creates a valid VideoMetadata.
 *
 * @category Compose
 * @param input - {@link VideoOptions}
 */
export function video({
  marketplace,
  locale = 'en',
  id = v4(),
  ...others
}: VideoOptions): VideoMetadata {
  return process(
    VideoSchema.safeParse({
      $schema: PublicationSchemaId.VIDEO_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.VIDEO,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type MirrorOptions = Prettify<
  UnbrandAll<
    Overwrite<
      ExtractLensSpec<MirrorMetadata>,
      {
        /**
         * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
         *
         * @defaultValue a UUID
         */
        id?: string;
      }
    >
  >
>;
/**
 * Creates a valid MirrorMetadata.
 *
 * @category Compose
 * @param input - {@link MirrorOptions}
 */
export function mirror({ id = v4(), ...others }: MirrorOptions): MirrorMetadata {
  return process(
    MirrorMetadataSchema.safeParse({
      $schema: MirrorSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}

/**
 * @category Compose
 */
export type ProfileOptions = Prettify<
  UnbrandAll<
    Overwrite<
      ExtractLensSpec<ProfileMetadata>,
      {
        /**
         * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
         *
         * @defaultValue a UUID
         */
        id?: string;
      }
    >
  >
>;
/**
 * Creates a valid ProfileMetadata.
 *
 * @category Compose
 * @param input - {@link ProfileOptions}
 */
export function profile({ id = v4(), ...others }: ProfileOptions): ProfileMetadata {
  return process(
    ProfileMetadataSchema.safeParse({
      $schema: ProfileSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
