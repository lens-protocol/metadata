import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import { AnyMediaSchema, mainContentFocus, metadataDetailsWith, publicationWith } from './common';

/**
 * @internal
 */
export const StorySchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.STORY_LATEST),
  lens: metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.STORY),

    asset: AnyMediaSchema.describe('The story asset.'),
  }),
});
export type StoryMetadata = z.infer<typeof StorySchema>;
