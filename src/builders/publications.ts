import { v4 } from 'uuid';

import { evaluate } from './ValidationError';
import { RecursiveUnbrand, InputForPublicationMetadataDetails } from './utils';
import { MarketplaceMetadata } from '../marketplace';
import {
  ThreeDMetadata,
  ThreeDSchema,
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
} from '../publication';

/**
 * The default locale used by the builder helpers.
 */
export const DEFAULT_LOCALE = 'en';

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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.ARTICLE_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = article({
 *   title: 'Great Question'
 *   content: `
 *     ## Heading
 *
 *     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.
 *
 *     ## Question
 *
 *     What is the answer to life, the universe and everything?
 *
 *     ## Answer
 *
 *     42
 *
 *     ![The answer](https://example.com/answer.png)
 *   `,
 *   tags: ['question', '42'],
 * });
 * ```
 */
export function article({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ArticleOptions): ArticleMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.AUDIO_LATEST`
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
 *
 * @example
 * Single track:
 * ```ts
 * const metadata = audio({
 *   title: 'Great song!',
 *   audio: {
 *     item: 'https://example.com/song.mp3',
 *     type: MediaAudioMimeType.MP3,
 *     artist: 'John Doe',
 *     cover: 'https://example.com/cover.png',
 *   },
 * });
 * ```
 *
 * @example
 * Album:
 * ```ts
 * const metadata = audio({
 *   title: 'Great song!',
 *   audio: {
 *     item: 'https://example.com/sample.mp3',
 *     type: MediaAudioMimeType.MP3,
 *     duration: 60,
 *     artist: 'John Doe',
 *     cover: 'https://example.com/cover.png',
 *   },
 *   attachments: [
 *     {
 *       item: 'https://example.com/song-1.mp3',
 *       type: MediaAudioMimeType.MP3,
 *       duration: 234,
 *     },
 *     {
 *       item: 'https://example.com/song-2.mp3',
 *       type: MediaAudioMimeType.MP3,
 *       duration: 345,
 *     },
 *   ],
 * });
 * ```
 */
export function audio({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: AudioOptions): AudioMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.CHECKING_IN_LATEST`
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
 *
 * @example
 * With GPS coordinates:
 * ```ts
 * const metadata = checkingIn({
 *   location: 'The Moon',
 *   position: geoUri({
 *     lat: 40.6892,
 *     lng: -74.0444,
 *   }),
 * });
 * ```
 * See {@link geoUri} for more details.
 *
 * @example
 * With a physical address:
 * ```ts
 * const metadata = checkingIn({
 *   location: 'The Moon',
 *   address: {
 *     streetAddress: '1st Street',
 *     locality: 'New York',
 *     region: 'NY',
 *     postalCode: '10001',
 *     country: 'US',
 *   },
 * });
 * ```
 */
export function checkingIn({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: CheckingInOptions): CheckingInMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.EMBED_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = embed({
 *   embed: 'https://example.com/embed.html',
 * });
 * ```
 */
export function embed({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: EmbedOptions): EmbedMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.EVENT_LATEST`
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
 *
 * @example
 * With GPS coordinates:
 * ```ts
 * const metadata = event({
 *   location: 'The Moon',
 *   position: geoUri({
 *     lat: 40.6892,
 *     lng: -74.0444,
 *   }),
 *   startsAt: '2028-10-01T00:00:00Z',
 *   endsAt: '2028-10-01T01:00:00Z',
 *   links: ['https://example.com/tickets.html'],
 * });
 * ```
 *
 * @example
 * With a physical address:
 * ```ts
 * const metadata = event({
 *   location: 'The Moon',
 *   address: {
 *     streetAddress: '1st Street',
 *     locality: 'New York',
 *     region: 'NY',
 *     postalCode: '10001',
 *     country: 'US',
 *   },
 *   startsAt: '2028-10-01T00:00:00Z',
 *   endsAt: '2028-10-01T01:00:00Z',
 * });
 * ```
 */
export function event({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: EventOptions): EventMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.IMAGE_LATEST`
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
 *
 * @example
 * Single image:
 *
 * ```ts
 * const metadata = image({
 *   title: 'Touch grass',
 *   image: {
 *     item: 'https://example.com/image.png',
 *     type: MediaImageMimeType.PNG,
 *     altTag: 'Me touching grass',
 *     license: MetadataLicenseType.CCO,
 *   },
 * });
 * ```
 *
 * @example
 * A gallery:
 * ```ts
 * const metadata = image({
 *   title: 'Touch grass',
 *   image: {
 *     item: 'https://example.com/cover.png',
 *     type: MediaImageMimeType.PNG,
 *     altTag: 'A collage of me touching grass',
 *     license: MetadataLicenseType.CCO,
 *   },
 *   attachments: [
 *     {
 *       item: 'https://example.com/image-1.png',
 *       type: MediaImageMimeType.PNG,
 *       license: MetadataLicenseType.CC_BY_NC,
 *       altTag: 'Me touching a tree',
 *     },
 *     {
 *       item: 'https://example.com/image-2.png',
 *       type: MediaImageMimeType.PNG,
 *       license: MetadataLicenseType.CC_BY_NC,
 *       altTag: 'The tree touching me',
 *     },
 *   ],
 * });
 * ```
 */
export function image({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ImageOptions): ImageMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.LINK_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = link({
 *   sharingLink: 'https://example.com/embed.html',
 *   content: 'Check out this cool website!',
 * });
 * ```
 */
export function link({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: LinkOptions): LinkMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.LIVESTREAM_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = liveStream({
 *   title: 'Live stream #1',
 *   liveUrl: 'https://example.com/live.html',
 *   playbackUrl: 'https://example.com/playback.html',
 *   startsAt: '2028-10-01T00:00:00Z',
 * });
 * ```
 */
export function liveStream({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: LiveStreamOptions): LiveStreamMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.MINT_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = mint({
 *   content: 'Check out this NFT!',
 *   mintLink:
 *     'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/1234567890',
 * });
 * ```
 */
export function mint({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: MintOptions): MintMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.SPACE_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = space({
 *   title: 'Space #1',
 *   link: 'https://example.com/space.html',
 *   startsAt: '2028-10-01T00:00:00Z',
 * });
 * ```
 */
export function space({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: SpaceOptions): SpaceMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.STORY_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = story({
 *   asset: {
 *     item: 'https://example.com/story.mp4',
 *     type: MediaVideoMimeType.MP4,
 *     cover: 'https://example.com/thumbnail.png',
 *     duration: 123,
 *     altTag: 'The story of my life',
 *   },
 * });
 * ```
 */
export function story({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: StoryOptions): StoryMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.TEXT_ONLY_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = textOnly({
 *   content: `Nice question!`,
 * });
 * ```
 */
export function textOnly({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: TextOnlyOptions): TextOnlyMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.THREE_D_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = threeD({
 *   content: 'Check out this 3D model!',
 *   assets: [
 *     {
 *       format: ThreeDFormat.VRM,
 *       playerUrl: 'https://example.com/player.html',
 *       uri: 'https://example.com/model.zip',
 *       zipPath: 'foo/model.vrm',
 *     },
 *   ],
 *   tags: ['3d', 'vrm'],
 * });
 * ```
 */
export function threeD({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ThreeDOptions): ThreeDMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.TRANSACTION_LATEST`
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
 *
 * @example
 * ```ts
 * const metadata = transaction({
 *   chainId: 1,
 *   txHash: '0x1234567890',
 *   content: 'Check out this transaction!',
 *   type: MetadataTransactionType.ERC20,
 * });
 * ```
 */
export function transaction({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: TransactionOptions): TransactionMetadata {
  return evaluate(
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
 * - `mainContentFocus` automatically set to `PublicationSchemaId.VIDEO_LATEST`
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
 *
 * @example
 * Single video:
 * ```ts
 * const metadata = video({
 *   title: 'Great video!',
 *   video: {
 *     item: 'https://example.com/video.mp4',
 *     type: MediaVideoMimeType.MP4,
 *     cover: 'https://example.com/thumbnail.png',
 *     duration: 123,
 *     altTag: 'The video of my life',
 *     license: MetadataLicenseType.CCO,
 *   },
 *   content: `
 *   In this video I will show you how to make a great video.
 *
 *   And maybe I will show you how to make a great video about making a great video.
 *   `
 * });
 * ```
 *
 * @example
 * Video with attachments:
 * ```ts
 * const metadata = video({
 *   title: 'Great video!',
 *   video: {
 *     item: 'https://example.com/video.mp4',
 *     type: MediaVideoMimeType.MP4,
 *     cover: 'https://example.com/thumbnail.png',
 *     duration: 123,
 *     altTag: 'The video of my life',
 *     license: MetadataLicenseType.CCO,
 *   },
 *   attachments: [
 *     {
 *       item: 'https://example.com/soundtrack.mp3',
 *       type: MediaAudioMimeType.MP3,
 *       license: MetadataLicenseType.CCO,
 *     }
 *   ]
 * });
 * ```
 */
export function video({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: VideoOptions): VideoMetadata {
  return evaluate(
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
 * All {@link VideoMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PublicationSchemaId.SHORT_VIDEO`
 */
export type ShortVideoOptions = VideoDetails & {
  /**
   * All the {@link MarketplaceMetadata} fields.
   */
  marketplace?: MarketplaceDetails;
};
/**
 * Creates a valid VideoMetadata for a short.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = video({
 *   title: 'Great video!',
 *   video: {
 *     item: 'https://example.com/video.mp4',
 *     type: MediaVideoMimeType.MP4,
 *     cover: 'https://example.com/thumbnail.png',
 *     duration: 123,
 *     altTag: 'The video of my life',
 *     license: MetadataLicenseType.CCO,
 *   }
 * });
 * ```
 */
export function shortVideo({
  marketplace,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ShortVideoOptions): VideoMetadata {
  return evaluate(
    VideoSchema.safeParse({
      $schema: PublicationSchemaId.VIDEO_LATEST,
      ...marketplace,
      lens: {
        id,
        locale,
        mainContentFocus: PublicationMainFocus.SHORT_VIDEO,
        ...others,
      },
    }),
  );
}
