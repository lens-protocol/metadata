import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { notEmptyString } from '../primitives.js';

/**
 * @internal
 */
export const TransactionSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.TRANSACTION),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.TRANSACTION),

    txHash: notEmptyString('The transaction hash.'),

    chainId: z.number().positive().int().describe('The Chain Id.'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type TransactionMetadata = z.infer<typeof TransactionSchema>;
