import { ProfileMetadata } from './profile';
import { MirrorMetadata, PublicationMetadata, PublicationSchemaId } from './publication';
import { assertNever, invariant } from './utils';

const schemaVersionRegex = /(\d+)\.(\d+)\.(\d+)/;

function parseVersion(schemaId: string): [string, string, string, string] {
  const result = schemaVersionRegex.exec(schemaId);

  invariant(result !== null, `Invalid schema id: ${schemaId}`);
  return [...result] as [string, string, string, string];
}

/**
 * Helper to extracts the version from the schema id of a metadata object.
 *
 * Most users will not need to use this function directly.
 *
 * @example
 * Extract the version of a profile metadata object:
 * ```ts
 * const metadata = await ProfileMetadataSchema.parse(valid);
 *
 * const version = extractVersion(metadata); // '2.0.0'
 * ```
 *
 * @example
 * Extract the version of a mirror metadata object:
 * ```ts
 * const metadata = await MirrorMetadataSchema.parse(valid);
 *
 * const version = extractVersion(metadata); // '1.0.0'
 * ```
 *
 * @example
 * Extract the version of a publication metadata object:
 * ```ts
 * const metadata = await PublicationMetadataSchema.parse(valid);
 *
 * const version = extractVersion(metadata); // '3.0.0'
 * ```
 *
 * @category Helpers
 * @experimental This function is experimental and may change or be removed in future versions.
 */
export function extractVersion(
  metadata: MirrorMetadata | ProfileMetadata | PublicationMetadata,
): string {
  const result = parseVersion(metadata.$schema);

  return result[0];
}

/**
 * Helper to extracts the major version  from the schema id of a metadata object.
 *
 * Most users will not need to use this function directly.
 *
 * @example
 * Extract the major of a profile metadata object:
 * ```ts
 * const metadata = await ProfileMetadataSchema.parse(valid);
 *
 * const major = extractMajorVersion(metadata); // '2.0.0'
 * ```
 *
 * @example
 * Extract the major of a mirror metadata object:
 * ```ts
 * const metadata = await MirrorMetadataSchema.parse(valid);
 *
 * const major = extractMajorVersion(metadata); // '1.0.0'
 * ```
 *
 * @example
 * Extract the major of a publication metadata object:
 * ```ts
 * const metadata = await PublicationMetadataSchema.parse(valid);
 *
 * const major = extractMajorVersion(metadata); // '3.1.0'
 * ```
 *
 * @category Helpers
 * @experimental This function is experimental and may change or be removed in future versions.
 */
export function extractMajorVersion(
  metadata: MirrorMetadata | ProfileMetadata | PublicationMetadata,
): string {
  const result = parseVersion(metadata.$schema);

  return result[1];
}

/**
 * Helper to upgrade a publication metadata object to the latest version.
 *
 * @param metadata - The publication metadata object to upgrade.
 * @returns The upgraded publication metadata object.
 * @internal
 */
export function upgradePublicationMetadata(metadata: PublicationMetadata): PublicationMetadata {
  const $schema = metadata.$schema;

  switch ($schema) {
    case PublicationSchemaId.ARTICLE_3_0_0:
    case PublicationSchemaId.ARTICLE_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.ARTICLE_LATEST,
      };

    case PublicationSchemaId.AUDIO_3_0_0:
    case PublicationSchemaId.AUDIO_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.AUDIO_LATEST,
      };

    case PublicationSchemaId.CHECKING_IN_3_0_0:
    case PublicationSchemaId.CHECKING_IN_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.CHECKING_IN_LATEST,
      };

    case PublicationSchemaId.EMBED_3_0_0:
    case PublicationSchemaId.EMBED_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.EMBED_LATEST,
      };

    case PublicationSchemaId.EVENT_3_0_0:
    case PublicationSchemaId.EVENT_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.EVENT_LATEST,
      };

    case PublicationSchemaId.IMAGE_3_0_0:
    case PublicationSchemaId.IMAGE_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.IMAGE_LATEST,
      };

    case PublicationSchemaId.LINK_3_0_0:
    case PublicationSchemaId.LINK_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.LINK_LATEST,
      };

    case PublicationSchemaId.LIVESTREAM_3_0_0:
    case PublicationSchemaId.LIVESTREAM_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.LIVESTREAM_LATEST,
      };

    case PublicationSchemaId.MINT_3_0_0:
    case PublicationSchemaId.MINT_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.MINT_LATEST,
      };

    case PublicationSchemaId.SPACE_3_0_0:
    case PublicationSchemaId.SPACE_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.SPACE_LATEST,
      };

    case PublicationSchemaId.TEXT_ONLY_3_0_0:
    case PublicationSchemaId.TEXT_ONLY_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.TEXT_ONLY_LATEST,
      };

    case PublicationSchemaId.STORY_3_0_0:
    case PublicationSchemaId.STORY_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.STORY_LATEST,
      };

    case PublicationSchemaId.TRANSACTION_3_0_0:
    case PublicationSchemaId.TRANSACTION_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.TRANSACTION_LATEST,
      };

    case PublicationSchemaId.THREE_D_3_0_0:
    case PublicationSchemaId.THREE_D_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.THREE_D_LATEST,
      };

    case PublicationSchemaId.VIDEO_3_0_0:
    case PublicationSchemaId.VIDEO_LATEST:
      return {
        ...metadata,
        $schema: PublicationSchemaId.VIDEO_LATEST,
      };
  }
  assertNever($schema, 'Unknown schema');
}
