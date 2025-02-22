import { z } from 'zod';

import {
  type ChainId,
  ChainIdSchema,
  type Markdown,
  MarkdownSchema,
  NonEmptyStringSchema,
  type Signature,
} from '../primitives.js';
import type { NftMetadata } from '../tokens/eip721.js';
import { PostMainFocus } from './PostMainFocus.js';
import { PostMetadataSchemaId } from './PostMetadataSchemaId.js';
import {
  type AnyMedia,
  AnyMediaSchema,
  type PostMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  postWith,
} from './common';

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
  txHash: string;
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
  content?: Markdown;
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

  txHash: NonEmptyStringSchema.describe('The transaction hash.'),

  type: z.nativeEnum(MetadataTransactionType).describe('The type of transaction.'),

  chainId: ChainIdSchema.describe('The Chain Id.'),

  content: MarkdownSchema.describe('Optional markdown content.').optional(),

  attachments: AnyMediaSchema.array()
    .min(1)
    .optional()
    .describe('The other attachments you want to include with it.'),
});

/**
 * Use this to model a post where a transaction is the main focus.
 */
export type TransactionMetadata = NftMetadata & {
  /**
   * The schema id.
   */
  $schema: PostMetadataSchemaId.TRANSACTION_LATEST;
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
  $schema: z.literal(PostMetadataSchemaId.TRANSACTION_LATEST),
  lens: TransactionMetadataDetailsSchema,
});
