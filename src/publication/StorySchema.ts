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
  $schema: PublicationSchemaId.STORY_LATEST | PublicationSchemaId.STORY_3_0_0;
  /**
   * The metadata details.
   */
  lens: StoryMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   *
   * @experimental DO NOT use yet
   */
  signature?: Signature;
};

/**
 * @internal
 */
export const StorySchema: z.ZodType<StoryMetadata, z.ZodTypeDef, object> = publicationWith({
  $schema: z.union([
    z.literal(PublicationSchemaId.STORY_LATEST),
    z.literal(PublicationSchemaId.STORY_3_0_0),
  ]),
  lens: StoryMetadataDetailsSchema,
});
