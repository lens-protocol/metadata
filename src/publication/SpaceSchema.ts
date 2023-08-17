import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
  datetime,
  uri,
} from './common';

/**
 * @internal
 */
export const SpaceSchema = publicationWith({
  $schema: z.literal(SchemaId.SPACE),

  lens: metadataDetailsWith({
    link: uri('The space join link.'),

    startsAt: datetime('The space start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.SPACE),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type SpaceMetadata = z.infer<typeof SpaceSchema>;
