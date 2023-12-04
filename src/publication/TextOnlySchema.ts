import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { PublicationSchemaId } from './PublicationSchemaId.js';
import {
  MarketplaceMetadata,
  PublicationMetadataCommon,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
} from './common';
import { EncryptableMarkdown, Signature, encryptableMarkdownSchema } from '../primitives.js';

export type TextOnlyMetadataDetails = PublicationMetadataCommon & {
  /**
   * The main focus of the publication.
   */
  mainContentFocus: PublicationMainFocus.TEXT_ONLY;
  /**
   * The content for the publication as markdown.
   */
  content: EncryptableMarkdown;
};

const TextOnlyMetadataDetailsSchema: z.ZodType<TextOnlyMetadataDetails, z.ZodTypeDef, object> =
  metadataDetailsWith({
    mainContentFocus: mainContentFocus(PublicationMainFocus.TEXT_ONLY),

    content: encryptableMarkdownSchema('The content for the publication as markdown.'),
  });

/**
 * Use this for a text-only publication.
 *
 * Most comments will fall into this category.
 */
export type TextOnlyMetadata = MarketplaceMetadata & {
  /**
   * The schema id.
   */
  $schema: PublicationSchemaId.TEXT_ONLY_LATEST;
  /**
   * The metadata details.
   */
  lens: TextOnlyMetadataDetails;
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
export const TextOnlySchema = publicationWith({
  $schema: z.literal(PublicationSchemaId.TEXT_ONLY_LATEST),
  lens: TextOnlyMetadataDetailsSchema,
});
