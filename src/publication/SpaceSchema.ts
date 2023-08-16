import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
  unixTimestamp,
  uri,
} from './common';

/**
 * @internal
 */
export const SpaceSchema = publicationWith({
  $schema: z.literal(SchemaId.SPACE),

  lens: metadataDetailsWith({
    link: uri('The space join link.'),

    startsAt: unixTimestamp('The space start time (unix timestamp).'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.SPACE),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type SpaceMetadata = z.infer<typeof SpaceSchema>;
