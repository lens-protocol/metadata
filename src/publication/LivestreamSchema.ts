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

export const LivestreamSchema = publicationWith({
  $schema: z.literal(SchemaId.LIVESTREAM),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.LIVESTREAM),

    title: z.string().optional().describe('The livestream title.'),

    startsAt: unixTimestamp('The stream start time (unit timestamp).'),

    endsAt: unixTimestamp('The optional stream end time (unit timestamp)').optional(),

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
export type Livestream = z.infer<typeof LivestreamSchema>;
