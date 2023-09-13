import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { encryptableStringSchema } from '../primitives.js';

export enum TransactionMetadataType {
  ERC721 = 'ERC721',
  ERC20 = 'ERC20',
  OTHER = 'OTHER',
}

/**
 * @internal
 */
export const TransactionSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.TRANSACTION_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.TRANSACTION),

    txHash: encryptableStringSchema('The transaction hash.'),

    type: z.nativeEnum(TransactionMetadataType).describe('The type of transaction.'),

    chainId: z.number().positive().int().describe('The Chain Id.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type TransactionMetadata = z.infer<typeof TransactionSchema>;
