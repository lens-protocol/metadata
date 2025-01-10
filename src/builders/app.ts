import { v4 } from 'uuid';

import { type AppMetadata, AppMetadataSchema, AppMetadataSchemaId, type Platform } from '../app';
import { evaluate } from './ValidationError';

export type AppOptions = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
  /**
   * The name of the app.
   */
  name: string;
  /**
   * A memorable phrase to capture the essence of the app.
   */
  tagline?: string;
  /**
   * An optional short and detailed description of the app, explaining its features and purpose.
   */
  description?: string;
  /**
   * The Logo icon for the app.
   */
  logo?: string;
  /**
   * The url of the app.
   */
  url: string;
  /**
   * The Developer of the app.
   */
  developer: string;
  /**
   * The platforms supported by the app. Currently supports `web`, `ios` and `android`.
   */
  platforms: Platform[];
  /**
   * The terms of service for the app.
   */
  termsOfService?: string;
  /**
   * The privacy policy for the app.
   */
  privacyPolicy?: string;
};
/**
 * Creates a valid AppMetadata.
 *
 * ```ts
 * const metadata = app({
 *   name: 'XYZ',
 *   description: 'The next big thing',
 *   logo: 'lens://bafybeigdyrzt5sfp7udm7hu76u…',
 *   developer: 'John Doe <john.does@email.com>',
 *   url: 'https://example.com',
 *   termsOfService: 'https://example.com/terms',
 *   privacyPolicy: 'https://example.com/privacy',
 *   platforms: ['web', 'ios', 'android'],
 * });
 * ```
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function app({ id = v4(), ...others }: AppOptions): AppMetadata {
  return evaluate(
    AppMetadataSchema.safeParse({
      $schema: AppMetadataSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
