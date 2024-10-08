import { z } from 'zod';

import { AppMetadataSchemaId } from './AppMetadataSchemaId';
import { marketplaceMetadataSchemaWith } from '../marketplace';
import { Markdown, NonEmptyStringSchema, URI, MarkdownSchema, UriSchema } from '../primitives';
import { NonEmptyArray } from '../utils';

export type AppMetadataDetails = {
  /**
   * The name of the app.
   */
  name: string;
  /**
   * An optional short and detailed description of the app, explaining its features and purpose.
   */
  description?: Markdown | null;
  /**
   * The Logo icon for the app.
   */
  logo?: URI | null;
  /**
   * The url of the app.
   */
  url: URL;

  /**
   * The Developer of the app.
   */
  developer: string;

  /**
   * The platforms supported by the app. Currently supports `web`, `ios` and `android`.
   */
  platforms: NonEmptyArray<Platform>;

  /**
   * The terms of service for the app.
   */
  termsOfService?: URL | null;

  /**
   * The privacy policy for the app.
   */
  privacyPolicy?: URL | null;
};

export enum Platform {
  WEB = 'web',
  IOS = 'ios',
  ANDROID = 'android',
}

const AppMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the app.'),
  description: MarkdownSchema.nullable()
    .optional()
    .describe(
      'An optional short and detailed description of the app, explaining its features and purpose.',
    ),
  logo: UriSchema.nullable().optional().describe('The Logo icon for the app.'),
  url: z.string().url().describe('The url of the app.'),
  developer: NonEmptyStringSchema.describe('The Developer of the app.'),
  platforms: z.array(z.nativeEnum(Platform)).describe('The platforms supported by the app.'),
  termsOfService: UriSchema.nullable().optional().describe('The terms of service for the app.'),
  privacyPolicy: UriSchema.nullable().optional().describe('The privacy policy for the app.'),
});

export const AppMetadataSchema = marketplaceMetadataSchemaWith({
  schema: z.literal(AppMetadataSchemaId),
  lens: AppMetadataDetailsSchema,
});
