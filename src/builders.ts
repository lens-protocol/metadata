import { v4 } from 'uuid';
import { z } from 'zod';

import { formatZodError } from './formatters';
import {
  ProfileMetadata,
  ProfileMetadataDetails,
  ProfileMetadataSchema,
  ProfileSchemaId,
} from './profile';
import {
  ThreeDMetadata,
  ThreeDSchema,
  // ArticleSchema,
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
  LiveStreamMetadata,
  LiveStreamSchema,
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
  ArticleMetadataDetails,
  AudioMetadataDetails,
  CheckingInMetadataDetails,
  EmbedMetadataDetails,
  EventMetadataDetails,
  ImageMetadataDetails,
  LinkMetadataDetails,
  LiveStreamMetadataDetails,
  MintMetadataDetails,
  SpaceMetadataDetails,
  StoryMetadataDetails,
  TextOnlyMetadataDetails,
  ThreeDMetadataDetails,
  TransactionMetadataDetails,
  VideoMetadataDetails,
  ArticleMetadata,
  ArticleSchema,
  PublicationMetadataCore,
} from './publication';
import { Brand, Overwrite, Prettify } from './utils.js';

/**
 * The default locale used by the builder helpers.
 *
 * @category Compose
 */
export const DEFAULT_LOCALE = 'en';

/**
 * An error that occurs when an object does not match the expected shape.
 *
 * @category Compose
 */
export class ValidationError extends Error {
  name = 'ValidationError' as const;
}

/**
 * @internal
 */
type BrandOf<A> = [A] extends [Brand<unknown, infer R>] ? R : never;

/**
 * @internal
 */
type RecursiveUnbrand<T> = T extends Brand<infer R, BrandOf<T>>
  ? R
  : {
      [K in keyof T]: RecursiveUnbrand<T[K]>;
    };

/**
 * @internal
 */
type ExtractLensSpec<T extends { lens: unknown }> = T['lens'];

/**
 * @internal
 */
type OmitInferredPublicationFields<T> = Omit<T, 'mainContentFocus'>;

/**
 * @internal
 */
type PublicationDefaults<Details extends ExtractLensSpec<PublicationMetadata>> = Overwrite<
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

type InputForPublicationMetadataDetails<T extends PublicationMetadata['lens']> = RecursiveUnbrand<
  OmitInferredPublicationFields<PublicationDefaults<T>>
>;

function process<Input, Output>(result: z.SafeParseReturnType<Input, Output>): Output {
  if (result.success) {
    return result.data;
  }
  throw new ValidationError(formatZodError(result.error));
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type MarketplaceDetails = RecursiveUnbrand<MarketplaceMetadata>;

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type ArticleDetails = InputForPublicationMetadataDetails<ArticleMetadataDetails>;
/**
 * All {@link ArticleMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type ArticleOptions = ArticleDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};

/**
 * Creates a valid ArticleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function article({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ArticleOptions): ArticleMetadata {
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type AudioDetails = InputForPublicationMetadataDetails<AudioMetadataDetails>;
/**
 * All {@link AudioMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type AudioOptions = AudioDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid AudioMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function audio({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type CheckingInDetails = InputForPublicationMetadataDetails<CheckingInMetadataDetails>;
/**
 * All {@link CheckingInMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type CheckingInOptions = CheckingInDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid CheckingInMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function checkingIn({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type EmbedDetails = InputForPublicationMetadataDetails<EmbedMetadataDetails>;
/**
 * All {@link EmbedMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type EmbedOptions = EmbedDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid EmbedMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function embed({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type EventDetails = InputForPublicationMetadataDetails<EventMetadataDetails>;
/**
 * All {@link EventMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type EventOptions = EventDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid EventMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function event({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ImageDetails = InputForPublicationMetadataDetails<ImageMetadataDetails>;
/**
 * All {@link ImageMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type ImageOptions = ImageDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid ImageMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function image({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type LinkDetails = InputForPublicationMetadataDetails<LinkMetadataDetails>;
/**
 * All {@link LinkMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type LinkOptions = LinkDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid LinkMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function link({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type LiveStreamDetails = InputForPublicationMetadataDetails<LiveStreamMetadataDetails>;
/**
 * All {@link LiveStreamMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type LiveStreamOptions = LiveStreamDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid LivestreamMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function livestream({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: LiveStreamOptions): LiveStreamMetadata {
  return process(
    LiveStreamSchema.safeParse({
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type MintDetails = InputForPublicationMetadataDetails<MintMetadataDetails>;
/**
 * All {@link MintMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type MintOptions = MintDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid MintMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function mint({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type SpaceDetails = InputForPublicationMetadataDetails<SpaceMetadataDetails>;
/**
 * All {@link SpaceMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type SpaceOptions = SpaceDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid SpaceMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function space({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type StoryDetails = InputForPublicationMetadataDetails<StoryMetadataDetails>;
/**
 * All {@link StoryMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type StoryOptions = StoryDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid StoryMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function story({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type TextOnlyDetails = InputForPublicationMetadataDetails<TextOnlyMetadataDetails>;
/**
 * All {@link TextOnlyMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type TextOnlyOptions = TextOnlyDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid TextOnlyMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function textOnly({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ThreeDDetails = InputForPublicationMetadataDetails<ThreeDMetadataDetails>;
/**
 * All {@link ThreeDMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type ThreeDOptions = ThreeDDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid ThreeDMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function threeD({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type TransactionDetails = InputForPublicationMetadataDetails<TransactionMetadataDetails>;
/**
 * All {@link TransactionMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type TransactionOptions = TransactionDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid TransactionMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function transaction({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type VideoDetails = InputForPublicationMetadataDetails<VideoMetadataDetails>;
/**
 * All {@link VideoMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 *
 * @category Compose
 */
export type VideoOptions = VideoDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid VideoMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function video({
  marketplace,
  locale = DEFAULT_LOCALE,
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type MirrorDetails = Prettify<RecursiveUnbrand<Omit<PublicationMetadataCore, 'id'>>>;
/**
 * All {@link PublicationMetadataCore} fields with:
 *
 * @category Compose
 */
export type MirrorOptions = MirrorDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};
/**
 * Creates a valid MirrorMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
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
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ProfileDetails = Prettify<RecursiveUnbrand<Omit<ProfileMetadataDetails, 'id'>>>;
/**
 * All {@link ProfileMetadataDetails} fields with:
 *
 * @category Compose
 */
export type ProfileOptions = ProfileDetails & {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
};
/**
 * Creates a valid ProfileMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
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
