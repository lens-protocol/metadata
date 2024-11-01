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
import { MarketplaceMetadata } from '../tokens/eip721.js';
import {
  ChainId,
  ChainIdSchema,
  EncryptableMarkdown,
  EncryptableMarkdownSchema,
  EncryptableString,
  Signature,
  EncryptableStringSchema,
} from '../primitives.js';

/**
 * A way to classify the type of transaction.
 */
export enum MetadataTransactionType {
  ERC721 = 'ERC721',
  ERC20 = 'ERC20',
  OTHER = 'OTHER',
}

export type TransactionMetadataDetails = PostMetadataCommon & {
  /**
   * The main focus of the post.
   */
  mainContentFocus: PostMainFocus.TRANSACTION;
  /**
   * The transaction hash.
   */
  txHash: EncryptableString;
  /**
   * The type of transaction.
   */
  type: MetadataTransactionType;
  /**
   * The Chain Id.
   */
  chainId: ChainId;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
  /**
   * The other attachments you want to include with it.
   */
  attachments?: AnyMedia[];
};

const TransactionMetadataDetailsSchema: z.ZodType<
  TransactionMetadataDetails,
  z.ZodTypeDef,
  object
> = metadataDetailsWith({
  mainContentFocus: mainContentFocus(PostMainFocus.TRANSACTION),

  txHash: EncryptableStringSchema.describe('The transaction hash.'),

  type: z.nativeEnum(MetadataTransactionType).describe('The type of transaction.'),

  chainId: ChainIdSchema.describe('The Chain Id.'),

  content: EncryptableMarkdownSchema.describe('Optional markdown content.').optional(),

  attachments: AnyMediaSchema.array()
    .min(1)
    .optional()
    .describe('The other attachments you want to include with it.'),
});

/**
 * Use this to model a post where a transaction is the main focus.
 */
export type TransactionMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PostSchemaId.TRANSACTION_LATEST;
  /**
   * The metadata details.
   */
  lens: TransactionMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const TransactionSchema = postWith({
  $schema: z.literal(PostSchemaId.TRANSACTION_LATEST),
  lens: TransactionMetadataDetailsSchema,
});
