import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common/index.js';

export const StorySchema = publicationWith({
  $schema: z.literal(SchemaId.STORY),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.STORY),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Story = z.infer<typeof StorySchema>;
