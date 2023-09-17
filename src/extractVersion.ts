import { ProfileMetadata } from './profile';
import { MirrorMetadata, PublicationMetadata } from './publication';
import { invariant } from './utils';

const schemaVersionRegex = /(\d+\.\d+\.\d+)/;
/**
 * Helper to extracts the version from the schema id of a metadata object.
 *
 * Most users will not need to use this function directly.
 *
 * @category Helpers
 * @experimental This function is experimental and may change or be removed in future versions.
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
 */

export function extractVersion(
  metadata: MirrorMetadata | ProfileMetadata | PublicationMetadata,
): string {
  const result = schemaVersionRegex.exec(metadata.$schema);

  invariant(result !== null, `Invalid schema id: ${metadata.$schema}`);
  return result[0];
}
