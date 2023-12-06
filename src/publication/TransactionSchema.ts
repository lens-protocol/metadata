import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MarketplaceMetadata,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import {
  ChainId,
  ChainIdSchema,
  EncryptableMarkdown,
  EncryptableString,
  Signature,
  encryptableMarkdownSchema,
  encryptableStringSchema,
} from '../primitives.js';

/**
 * A way to classify the type of transaction.
 */
export enum MetadataTransactionType {
  ERC721 = 'ERC721',
  ERC20 = 'ERC20',
  OTHER = 'OTHER',
}

export type TransactionMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.TRANSACTION;
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
  mainContentFocus: mainContentFocus(PublicationMainFocus.TRANSACTION),

  txHash: encryptableStringSchema('The transaction hash.'),

  type: z.nativeEnum(MetadataTransactionType).describe('The type of transaction.'),

  chainId: ChainIdSchema.describe('The Chain Id.'),

  content: encryptableMarkdownSchema('Optional markdown content.').optional(),

  attachments: AnyMediaSchema.array()
    .min(1)
    .optional()
    .describe('The other attachments you want to include with it.'),
});

/**
 * Use this to model a publication where a transaction is the main focus.
 */
export type TransactionMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.TRANSACTION_LATEST;
  /**
   * The metadata details.
   */
  lens: TransactionMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   *
   * @experimental DO NOT use yet
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const TransactionSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.TRANSACTION_LATEST),
  lens: TransactionMetadataDetailsSchema,
});
