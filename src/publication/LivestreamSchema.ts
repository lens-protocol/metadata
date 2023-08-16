import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  metadataDetailsWith,
  publicationWith,
  unixTimestamp,
  uri,
} from './common/index.js';

export const LivestreamSchema = publicationWith({
  $schema: z.literal(SchemaId.LIVESTREAM),
  lens: metadataDetailsWith({
    mainContentFocus: z.literal(PublicationMainFocus.LIVESTREAM, {
      description: 'The main focus of the publication.',
    }),

    title: z.string().optional().describe('The livestream title.'),

    startsAt: unixTimestamp('The start timestamp of the stream.'),

    endsAt: unixTimestamp('The optional end timestamp of the stream').optional(),

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
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Livestream = z.infer<typeof LivestreamSchema>;
