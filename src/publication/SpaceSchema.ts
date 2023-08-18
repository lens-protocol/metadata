import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { datetime, uri } from '../primitives.js';

/**
 * @internal
 */
export const SpaceSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.SPACE),

  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.SPACE),

    link: uri('The space join link.'),

    startsAt: datetime('The space start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).'),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type SpaceMetadata = z.infer<typeof SpaceSchema>;
