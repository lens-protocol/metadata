import { z } from 'zod';

import { PostMainFocus } from './PostMainFocus.js';
import { PostSchemaId } from './PostSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';
import { NftMetadata } from '../tokens/eip721.js';
import {
  EncryptableMarkdown,
  EncryptableURI,
  Signature,
  EncryptableUriSchema,
  EncryptableMarkdownSchema,
} from '../primitives.js';

// TODO validate the mint link using the allow list

export type MintMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.MINT;
  /**
   * The mint item it can be a URL of the known provider like opensea
   * https://opensea.io/assets/ethereum/0xfaa2471e93bd1cee3b0ab381c242ada8e1d1a759/299
   * or https://zora.co/collect/0x9d90669665607f08005cae4a7098143f554c59ef/39626.
   *
   * The Lens API has an allow list of providers and if the domain does not match it will mark it as failed metadata
   */
  mintLink: EncryptableURI;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * Any attachment you want to include with it.
   */
  attachments?: AnyMedia[];
};

const MintMetadataDetailsSchema: z.ZodType<MintMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PostMainFocus.MINT),

    mintLink: EncryptableUriSchema.describe(
      'The mint item it can be a URL of the known provider like opensea ' +
        'https://opensea.io/assets/ethereum/0xfaa2471e93bd1cee3b0ab381c242ada8e1d1a759/299 ' +
        'or https://zora.co/collect/0x9d90669665607f08005cae4a7098143f554c59ef/39626. ' +
        'The Lens API has an allow list of providers and if the domain does not match it will mark it as failed metadata',
    ),

    content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  });

/**
 * Use this to share a link to mint an NFT.
 */
export type MintMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.MINT_LATEST;
  /**
   * The metadata details.
   */
  lens: MintMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const MintSchema = postWith({
  $schema: z.literal(PostSchemaId.MINT_LATEST),
  lens: MintMetadataDetailsSchema,
});
