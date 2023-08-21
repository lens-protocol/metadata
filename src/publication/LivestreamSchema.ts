import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';
import { datetime, notEmptyString, uri } from '../primitives.js';

/**
 * @internal
 */
export const LivestreamSchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.LIVESTREAM_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.LIVESTREAM),

    title: notEmptyString().optional().describe('The livestream title.'),

    startsAt: datetime('The stream start time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`).'),

    endsAt: datetime(
      'The optional stream end time (ISO 8601 `YYYY-MM-DDTHH:mm:ss.sssZ`)',
    ).optional(),

    playbackUrl: uri(
      'Some livestream platforms have the playback url as a separate url. ' +
        'If not your case make sure `liveUrl` and `playbackUrl` are the same.',
    ),

    liveUrl: uri(
      'Some livestream platforms have the live url as a separate url. ' +
        'If not your case make sure `liveUrl` and `playbackUrl` are the same.',
    ),

    checkLiveAPI: uri(
      'The data cannot be changed so you can put in an API endpoint to know if it is still live or not for clients to be able to check.',
    ).optional(),

    attachments: AnyMediaSchema.array()
      .min(1)
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type LivestreamMetadata = z.infer<typeof LivestreamSchema>;
