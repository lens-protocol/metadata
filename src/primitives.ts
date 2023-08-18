import { z } from 'zod';

import { Brand } from './utils.js';

export function notEmptyString(description?: string) {
  return z.string({ description }).min(1);
}

/**
 * A locale identifier.
 *
 * Syntax: [language]-[region] where:
 * - [language] is a lowercase ISO 639-1 language code
 * - [region] is an optional uppercase ISO 3166-1 alpha-2 country code
 *
 * You can pass just the language code, or both the language and region codes.
 *
 * @example
 * - `en` any English
 * - `en-US` English as used in the United States
 * - `en-GB` English as used in the United Kingdom
 */
export type Locale = Brand<string, 'Locale'>;
export const LocaleSchema: z.Schema<Locale, z.ZodTypeDef, string> = z
  .string({
    description: 'A locale identifier.',
  })
  .min(2)
  .max(5)
  .transform((value) => value as Locale);

/**
 * A Lens App identifier.
 */
export type AppId = Brand<string, 'AppId'>;
export const AppIdSchema: z.Schema<AppId, z.ZodTypeDef, string> = notEmptyString(
  'A Lens App identifier.',
).transform((value) => value as AppId);

/**
 * A cryptographic signature.
 */
export type Signature = Brand<string, 'Signature'>;
export const SignatureSchema: z.Schema<Signature, z.ZodTypeDef, string> = notEmptyString(
  'A cryptographic signature of the Lens metadata.',
).transform((value) => value as Signature);

/**
 * A markdown text.
 */
export type Markdown = Brand<string, 'Markdown'>;
export function markdown(
  description: string = 'A Markdown text.',
): z.Schema<Markdown, z.ZodTypeDef, string> {
  return notEmptyString(description).transform((value) => value as Markdown);
}

/**
 * A Uniform Resource Identifier.
 *
 * It could be a URL pointing to a specific resource,
 * an IPFS URI (e.g. ipfs://Qm...), or an Arweave URI (e.g. ar://Qm...).
 */
export type URI = Brand<string, 'URI'>;
export function uri(
  description: string = 'A Uniform Resource Identifier. ',
): z.Schema<URI, z.ZodTypeDef, string> {
  return z
    .string({ description })
    .min(6) // [ar://.]
    .url() // reads url() but works well with URIs too and uses format: 'uri' in the JSON schema
    .transform((value) => value as URI);
}

export const GeoLocationSchema = z.object({
  latitude: z.number({ description: 'Latitude in decimal coordinates (e.g. 41.40338).' }),
  longitude: z.number({ description: 'Longitude in decimal coordinates (e.g. 2.17403).' }),
});
/**
 * A geographic location.
 */
export type GeoLocation = z.infer<typeof GeoLocationSchema>;

/**
 * An ISO 8601 in the JS simplified format: `YYYY-MM-DDTHH:mm:ss.sssZ`.
 */
export type Datetime = Brand<string, 'Datetime'>;
export function datetime(description: string): z.Schema<Datetime, z.ZodTypeDef, string> {
  return z
    .string({ description })
    .datetime()
    .transform((value) => value as Datetime);
}
