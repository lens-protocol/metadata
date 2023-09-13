import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import {
  encryptableDatetimeSchema,
  encryptableUriSchema,
  nonEmptyStringSchema,
} from '../primitives.js';

/**
 * @internal
 */
export const SpaceSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.SPACE_LATEST),

  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.SPACE),

    title: nonEmptyStringSchema().describe('The space title.'),

    link: encryptableUriSchema('The space join link.'),

    startsAt: encryptableDatetimeSchema(
      'The space start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).',
    ),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type SpaceMetadata = z.infer<typeof SpaceSchema>;
