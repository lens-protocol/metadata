import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  AnyMedia,
  AnyMediaSchema,
  MarketplaceMetadata,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import { EncryptableMarkdown, Signature, encryptableMarkdownSchema } from '../primitives.js';

export type StoryMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.STORY;
  /**
   * The story asset.
   */
  asset: AnyMedia;
  /**
   * Optional markdown content.
   */
  content?: EncryptableMarkdown;
};

const StoryMetadataDetailsSchema: z.ZodType<StoryMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.STORY),

    asset: AnyMediaSchema.describe('The story asset.'),

    content: encryptableMarkdownSchema('Optional markdown content.').optional(),
  });

/**
 * Use this to model an Instagram-like story.
 */
export type StoryMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.STORY_LATEST;
  /**
   * The metadata details.
   */
  lens: StoryMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   *
   * @experimental DO NOT use ye
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const StorySchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.STORY_LATEST),
  lens: StoryMetadataDetailsSchema,
});
