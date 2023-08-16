import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';

/**
 * @internal
 */
export const TransactionSchema = publicationWith({
  $schema: z.literal(SchemaId.TRANSACTION),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.TRANSACTION),

    txHash: z.string().describe('The transaction hash.'),

    chainId: z.number().positive().describe('The chain Id.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type TransactionMetadata = z.infer<typeof TransactionSchema>;
