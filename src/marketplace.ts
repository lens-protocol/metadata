import { z } from 'zod';

import { Markdown, URI, markdown, nonEmptyStringSchema, uriSchema } from './primitives.js';

/**
 * The display type of a marketplace metadata attribute.
 *
 * @see https://docs.opensea.io/docs/metadata-standards#attributes
 */
export enum MarketplaceMetadataAttributeDisplayType {
  NUMBER = 'number',
  STRING = 'string',
  DATE = 'date',
}

/**
 * A marketplace metadata attribute.
 *
 * @see https://docs.opensea.io/docs/metadata-standards#attributes
 */
export type MarketplaceMetadataAttribute = {
  value?: string | number | undefined;
  display_type?: MarketplaceMetadataAttributeDisplayType | undefined;
  trait_type?: string | undefined;
};

/**
 * @internal
 */
export const MarketplaceMetadataAttributeSchema: z.ZodType<
  MarketplaceMetadataAttribute,
  z.ZodTypeDef,
  object
> = z
  .object({
    display_type: z.nativeEnum(MarketplaceMetadataAttributeDisplayType).optional(),
    trait_type: nonEmptyStringSchema('The name of the trait.').optional(),
    value: z.union([z.string(), z.number()]).optional(),
  })
  .passthrough(); // make it more loose to allow for future marketplace extensions

/**
 * The metadata standard for marketplace(s).
 *
 * @see https://docs.opensea.io/docs/metadata-standards#metadata-structure
 */
export type MarketplaceMetadata = {
  /**
   * A human-readable description of the item. It could be plain text or markdown.
   */
  description?: Markdown | null;
  /**
   * This is the URL that will appear below the asset's image on OpenSea and others etc.
   * and will allow users to leave OpenSea and view the item on the site.
   */
  external_url?: URI | null;
  /**
   * Name of the NFT item.
   */
  name?: string;
  /**
   * These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.
   *
   * @see https://docs.opensea.io/docs/metadata-standards#attributes
   */
  attributes?: MarketplaceMetadataAttribute[];
  /**
   * Marketplaces will store any NFT image here.
   */
  image?: URI | null;
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   * and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
   * `animation_url` also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   * WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animation_url?: URI | null;
};

/**
 * @internal
 */
export const MarketplaceMetadataSchema = z
  .object({
    description: markdown(
      z.string({
        description:
          'A human-readable description of the item. It could be plain text or markdown.',
      }),
    )
      .optional()
      .nullable()
      .catch(null),

    external_url: uriSchema(
      `This is the URL that will appear below the asset's image on OpenSea and others etc. ` +
        'and will allow users to leave OpenSea and view the item on the site.',
    )
      .optional()
      .nullable()
      .catch(null),

    name: z.string({ description: 'Name of the NFT item.' }).optional(),

    attributes: MarketplaceMetadataAttributeSchema.array()
      .optional()
      .describe(
        'These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.',
      )
      .catch([]),

    image: uriSchema('Marketplaces will store any NFT image here.')
      .optional()
      .nullable()
      .catch(null),

    animation_url: uriSchema(
      'A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, ' +
        'and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. ' +
        'Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, ' +
        'WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.',
    )
      .optional()
      .nullable()
      .catch(null),
  })
  .passthrough(); // loose validation for any unknown fields;
