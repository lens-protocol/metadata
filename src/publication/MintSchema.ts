import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { uri } from '../primitives.js';

/**
 * @internal
 */
export const MintSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.MINT_LATEST),

  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.MINT),

    mintLink: uri(
      'The mint item it can be a URL of the known provider like opensea ' +
        'https://opensea.io/assets/ethereum/0xfaa2471e93bd1cee3b0ab381c242ada8e1d1a759/299 ' +
        'or https://zora.co/collect/0x9d90669665607f08005cae4a7098143f554c59ef/39626. ' +
        'The Lens API has an allow list of providers and if the domain does not match it will mark it as failed metadata',
    ),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type MintMetadata = z.infer<typeof MintSchema>;
