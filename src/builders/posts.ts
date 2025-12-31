import { v4 } from 'uuid';

import {
  type ArticleMetadata,
  type ArticleMetadataDetails,
  ArticleSchema,
  type AudioMetadata,
  type AudioMetadataDetails,
  AudioSchema,
  type CheckingInMetadata,
  type CheckingInMetadataDetails,
  CheckingInSchema,
  type EmbedMetadata,
  type EmbedMetadataDetails,
  EmbedSchema,
  type EventMetadata,
  type EventMetadataDetails,
  EventSchema,
  type ExperimentalPostMetadata,
  type ExperimentalPostMetadataDetails,
  ExperimentalPostSchema,
  type ImageMetadata,
  type ImageMetadataDetails,
  ImageSchema,
  type LinkMetadata,
  type LinkMetadataDetails,
  LinkSchema,
  type LiveStreamMetadata,
  type LiveStreamMetadataDetails,
  LiveStreamSchema,
  type MintMetadata,
  type MintMetadataDetails,
  MintSchema,
  PostMainFocus,
  PostMetadataSchemaId,
  type SpaceMetadata,
  type SpaceMetadataDetails,
  SpaceSchema,
  type StoryMetadata,
  type StoryMetadataDetails,
  StorySchema,
  type TextOnlyMetadata,
  type TextOnlyMetadataDetails,
  TextOnlySchema,
  type ThreeDMetadata,
  type ThreeDMetadataDetails,
  ThreeDSchema,
  type TransactionMetadata,
  type TransactionMetadataDetails,
  TransactionSchema,
  type VideoMetadata,
  type VideoMetadataDetails,
  VideoSchema,
} from '../post';
import type { NftMetadata } from '../tokens/eip721';
import { evaluate } from './ValidationError.js';
import type { InputForPostMetadataDetails, RecursiveUnbrand } from './utils.js';

/**
 * The default locale used by the builder helpers.
 */
export const DEFAULT_LOCALE = 'en';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type NftDetails = RecursiveUnbrand<NftMetadata>;

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type ArticleDetails = InputForPostMetadataDetails<ArticleMetadataDetails>;
/**
 * All {@link ArticleMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.ARTICLE_LATEST`
 */
export type ArticleOptions = ArticleDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ArticleOptions): ArticleMetadata {
  return evaluate(
    ArticleSchema.safeParse({
      $schema: PostMetadataSchemaId.ARTICLE_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.ARTICLE,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type AudioDetails = InputForPostMetadataDetails<AudioMetadataDetails>;
/**
 * All {@link AudioMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.AUDIO_LATEST`
 */
export type AudioOptions = AudioDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: AudioOptions): AudioMetadata {
  return evaluate(
    AudioSchema.safeParse({
      $schema: PostMetadataSchemaId.AUDIO_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.AUDIO,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docsRemarks MUST stay very @private to produce usable docs
 */
type CheckingInDetails = InputForPostMetadataDetails<CheckingInMetadataDetails>;
/**
 * All {@link CheckingInMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.CHECKING_IN_LATEST`
 */
export type CheckingInOptions = CheckingInDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: CheckingInOptions): CheckingInMetadata {
  return evaluate(
    CheckingInSchema.safeParse({
      $schema: PostMetadataSchemaId.CHECKING_IN_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.CHECKING_IN,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type EmbedDetails = InputForPostMetadataDetails<EmbedMetadataDetails>;
/**
 * All {@link EmbedMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.EMBED_LATEST`
 */
export type EmbedOptions = EmbedDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: EmbedOptions): EmbedMetadata {
  return evaluate(
    EmbedSchema.safeParse({
      $schema: PostMetadataSchemaId.EMBED_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.EMBED,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type EventDetails = InputForPostMetadataDetails<EventMetadataDetails>;
/**
 * All {@link EventMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.EVENT_LATEST`
 */
export type EventOptions = EventDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: EventOptions): EventMetadata {
  return evaluate(
    EventSchema.safeParse({
      $schema: PostMetadataSchemaId.EVENT_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.EVENT,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ImageDetails = InputForPostMetadataDetails<ImageMetadataDetails>;
/**
 * All {@link ImageMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.IMAGE_LATEST`
 */
export type ImageOptions = ImageDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ImageOptions): ImageMetadata {
  return evaluate(
    ImageSchema.safeParse({
      $schema: PostMetadataSchemaId.IMAGE_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.IMAGE,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type LinkDetails = InputForPostMetadataDetails<LinkMetadataDetails>;
/**
 * All {@link LinkMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.LINK_LATEST`
 */
export type LinkOptions = LinkDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: LinkOptions): LinkMetadata {
  return evaluate(
    LinkSchema.safeParse({
      $schema: PostMetadataSchemaId.LINK_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.LINK,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type LiveStreamDetails = InputForPostMetadataDetails<LiveStreamMetadataDetails>;
/**
 * All {@link LiveStreamMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.LIVESTREAM_LATEST`
 */
export type LiveStreamOptions = LiveStreamDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: LiveStreamOptions): LiveStreamMetadata {
  return evaluate(
    LiveStreamSchema.safeParse({
      $schema: PostMetadataSchemaId.LIVESTREAM_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.LIVESTREAM,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type MintDetails = InputForPostMetadataDetails<MintMetadataDetails>;
/**
 * All {@link MintMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.MINT_LATEST`
 */
export type MintOptions = MintDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: MintOptions): MintMetadata {
  return evaluate(
    MintSchema.safeParse({
      $schema: PostMetadataSchemaId.MINT_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.MINT,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type CustomDetails = InputForPostMetadataDetails<ExperimentalPostMetadataDetails>;
/**
 * All {@link ExperimentalPostMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.CUSTOM_LATEST`
 */
export type CustomOptions = CustomDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
};
/**
 * Creates a valid CustomMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = custom({
 *   name: 'My Custom Post Type',
 *   value: JSON.stringify({
 *     customField1: 'value1',
 *     customField2: 42,
 *     customField3: ['item1', 'item2']
 *   }),
 *   tags: ['custom', 'special'],
 * });
 * ```
 */
export function custom({
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: CustomOptions): ExperimentalPostMetadata {
  return evaluate(
    ExperimentalPostSchema.safeParse({
      $schema: PostMetadataSchemaId.CUSTOM_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.CUSTOM,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type SpaceDetails = InputForPostMetadataDetails<SpaceMetadataDetails>;
/**
 * All {@link SpaceMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.SPACE_LATEST`
 */
export type SpaceOptions = SpaceDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: SpaceOptions): SpaceMetadata {
  return evaluate(
    SpaceSchema.safeParse({
      $schema: PostMetadataSchemaId.SPACE_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.SPACE,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type StoryDetails = InputForPostMetadataDetails<StoryMetadataDetails>;
/**
 * All {@link StoryMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.STORY_LATEST`
 */
export type StoryOptions = StoryDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: StoryOptions): StoryMetadata {
  return evaluate(
    StorySchema.safeParse({
      $schema: PostMetadataSchemaId.STORY_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.STORY,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type TextOnlyDetails = InputForPostMetadataDetails<TextOnlyMetadataDetails>;
/**
 * All {@link TextOnlyMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.TEXT_ONLY_LATEST`
 */
export type TextOnlyOptions = TextOnlyDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: TextOnlyOptions): TextOnlyMetadata {
  return evaluate(
    TextOnlySchema.safeParse({
      $schema: PostMetadataSchemaId.TEXT_ONLY_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.TEXT_ONLY,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ThreeDDetails = InputForPostMetadataDetails<ThreeDMetadataDetails>;
/**
 * All {@link ThreeDMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.THREE_D_LATEST`
 */
export type ThreeDOptions = ThreeDDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ThreeDOptions): ThreeDMetadata {
  return evaluate(
    ThreeDSchema.safeParse({
      $schema: PostMetadataSchemaId.THREE_D_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.THREE_D,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type TransactionDetails = InputForPostMetadataDetails<TransactionMetadataDetails>;
/**
 * All {@link TransactionMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.TRANSACTION_LATEST`
 */
export type TransactionOptions = TransactionDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: TransactionOptions): TransactionMetadata {
  return evaluate(
    TransactionSchema.safeParse({
      $schema: PostMetadataSchemaId.TRANSACTION_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.TRANSACTION,
        ...others,
      },
    }),
  );
}

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type VideoDetails = InputForPostMetadataDetails<VideoMetadataDetails>;
/**
 * All {@link VideoMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.VIDEO_LATEST`
 */
export type VideoOptions = VideoDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: VideoOptions): VideoMetadata {
  return evaluate(
    VideoSchema.safeParse({
      $schema: PostMetadataSchemaId.VIDEO_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.VIDEO,
        ...others,
      },
    }),
  );
}

/**
 * All {@link VideoMetadataDetails} fields with:
 * - `id` defaults to a UUID
 * - `locale` defaults to `en`
 * - `mainContentFocus` automatically set to `PostSchemaId.SHORT_VIDEO`
 */
export type ShortVideoOptions = VideoDetails & {
  /**
   * All the {@link NftMetadata} fields.
   */
  nft?: NftDetails;
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
  nft,
  locale = DEFAULT_LOCALE,
  id = v4(),
  ...others
}: ShortVideoOptions): VideoMetadata {
  return evaluate(
    VideoSchema.safeParse({
      $schema: PostMetadataSchemaId.VIDEO_LATEST,
      ...nft,
      lens: {
        id,
        locale,
        mainContentFocus: PostMainFocus.SHORT_VIDEO,
        ...others,
      },
    }),
  );
}
