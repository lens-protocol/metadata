import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common/index.js';

export const TransactionSchema = publicationWith({
  $schema: z.literal(SchemaId.TRANSACTION),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.TRANSACTION),

    txHash: z.string().describe('The transaction hash.'),

    chainId: z.number().positive().describe('The chain Id.'),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Transaction = z.infer<typeof TransactionSchema>;
