import { z } from 'zod';

import { Markdown, URI, NonEmptyStringSchema, MarkdownSchema, UriSchema } from '../primitives.js';

/**
 * The display type of a marketplace metadata attribute.
 *
 * @see https://docs.opensea.io/docs/metadata-standards#attributes
 */
export enum NftMetadataAttributeDisplayType {
  NUMBER = 'number',
  STRING = 'string',
  DATE = 'date',
}

/**
 * A marketplace metadata attribute.
 *
 * @see https://docs.opensea.io/docs/metadata-standards#attributes
 */
export type NftMetadataAttribute = {
  value?: string | number | undefined;
  display_type?: NftMetadataAttributeDisplayType | undefined;
  trait_type?: string | undefined;
};

/**
 * @internal
 */
export const Nft721MetadataAttributeSchema: z.ZodType<NftMetadataAttribute, z.ZodTypeDef, object> =
  z
    .object({
      display_type: z.nativeEnum(NftMetadataAttributeDisplayType).optional(),
      trait_type: NonEmptyStringSchema.optional().describe('The name of the trait.'),
      value: z.union([z.string(), z.number()]).optional(),
    })
    .passthrough(); // make it more loose to allow for future marketplace extensions

/**
 * An NFT metadata standard for interoperability with NFT marketplaces and wallets.
 *
 * @see https://docs.opensea.io/docs/metadata-standards#metadata-structure
 * @see https://github.com/ethereum/ercs/blob/master/ERCS/erc-721.md
 * @see https://github.com/ethereum/ercs/blob/master/ERCS/erc-1155.md
 */
export type NftMetadata = {
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
  attributes?: NftMetadataAttribute[];
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
export function nftMetadataSchemaWith<Augmentation extends z.ZodRawShape>(
  augmentation: Augmentation,
) {
  return z
    .object({
      description: MarkdownSchema.describe(
        'A human-readable description of the item. It could be plain text or markdown.',
      )
        .nullable()
        .optional()
        .catch(null),

      external_url: UriSchema.describe(
        `This is the URL that will appear below the asset's image on OpenSea and others etc. ` +
          'and will allow users to leave OpenSea and view the item on the site.',
      )
        .nullable()
        .optional()
        .catch(null),

      name: z.string({ description: 'Name of the NFT item.' }).optional(),

      attributes: Nft721MetadataAttributeSchema.array()
        .optional()
        .describe(
          'These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.',
        )
        .catch([]),

      image: UriSchema.describe('Marketplaces will store any NFT image here.')
        .nullable()
        .optional()
        .catch(null),

      animation_url: UriSchema.describe(
        'A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, ' +
          'and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. ' +
          'Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, ' +
          'WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.',
      )
        .nullable()
        .optional()
        .catch(null),
    })
    .extend(augmentation)
    .passthrough(); // loose validation for any unknown fields;
}
