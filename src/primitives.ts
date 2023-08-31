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
/**
 * @internal
 */
export const LocaleSchema: z.Schema<Locale, z.ZodTypeDef, string> = z
  .string({
    description: 'A locale identifier.',
  })
  .min(2)
  .max(5)
  .transform((value) => value as Locale);

/**
 * An arbitrary tag.
 */
export type Tag = Brand<string, 'Tag'>;
/**
 * @internal
 */
export const TagSchema: z.Schema<Tag, z.ZodTypeDef, string> = notEmptyString('An arbitrary tag.')
  .max(50)
  .transform((tag) => tag.toLowerCase() as Tag);

/**
 * A Lens App identifier.
 */
export type AppId = Brand<string, 'AppId'>;
/**
 * @internal
 */
export const AppIdSchema: z.Schema<AppId, z.ZodTypeDef, string> = notEmptyString(
  'A Lens App identifier.',
).transform((value) => value as AppId);

/**
 * A cryptographic signature.
 */
export type Signature = Brand<string, 'Signature'>;
/**
 * @internal
 */
export const SignatureSchema: z.Schema<Signature, z.ZodTypeDef, string> = notEmptyString(
  'A cryptographic signature of the Lens metadata.',
).transform((value) => value as Signature);

/**
 * A markdown text.
 */
export type Markdown = Brand<string, 'Markdown'>;
/**
 * @internal
 */
export function markdown(description: string): z.Schema<Markdown, z.ZodTypeDef, string> {
  return notEmptyString(description).transform((value) => value as Markdown);
}

/**
 * A Uniform Resource Identifier.
 *
 * It could be a URL pointing to a specific resource,
 * an IPFS URI (e.g. ipfs://Qm...), or an Arweave URI (e.g. ar://Qm...).
 */
export type URI = Brand<string, 'URI'>;
/**
 * @internal
 */
export function uri(
  description: string = 'A Uniform Resource Identifier. ',
): z.Schema<URI, z.ZodTypeDef, string> {
  return z
    .string({ description })
    .min(6) // [ar://.]
    .url() // reads url() but works well with URIs too and uses format: 'uri' in the JSON schema
    .transform((value) => value as URI);
}

/**
 * @internal
 */
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
/**
 * @internal
 */
export function datetime(description: string): z.Schema<Datetime, z.ZodTypeDef, string> {
  return z
    .string({ description })
    .datetime()
    .transform((value) => value as Datetime);
}

/**
 * An EVM compatible address.
 */
export type EvmAddress = Brand<string, 'EvmAddress'>;
/**
 * @internal
 */
export const EvmAddressSchema: z.Schema<EvmAddress, z.ZodTypeDef, string> = notEmptyString(
  'An EVM compatible address.',
).transform((value) => value as EvmAddress);

/**
 * An EVM compatible Chain Id.
 */
export type ChainId = Brand<number, 'ChainId'>;
/**
 * @internal
 */
export const ChainIdSchema: z.Schema<ChainId, z.ZodTypeDef, number> = z
  .number()
  .positive()
  .transform((value) => value as ChainId);

/**
 * @internal
 */
export const NetworkAddressSchema = z.object(
  {
    chainId: ChainIdSchema,
    address: EvmAddressSchema,
  },
  {
    description: 'An EVM compatible address on a specific chain.',
  },
);
/**
 * An EVM compatible address on a specific chain.
 */
export type NetworkAddress = z.infer<typeof NetworkAddressSchema>;

/**
 * An NFT token identifier.
 */
export type TokenId = Brand<string, 'TokenId'>;
/**
 * @internal
 */
export const TokenIdSchema: z.Schema<TokenId, z.ZodTypeDef, string> = notEmptyString().transform(
  (value) => value as TokenId,
);

/**
 * @internal
 */
export const AmountSchema = z.object(
  {
    currency: NetworkAddressSchema,
    value: notEmptyString('The amount in the smallest unit of the currency (e.g. wei for ETH).'),
  },
  {
    description: 'An amount of a specific currency.',
  },
);
/**
 * An amount of a specific currency.
 */
export type Amount = z.infer<typeof AmountSchema>;

/**
 * A Profile identifier.
 */
export type ProfileId = Brand<string, 'ProfileId'>;
/**
 * @internal
 */
export const ProfileIdSchema: z.Schema<ProfileId, z.ZodTypeDef, string> =
  notEmptyString().transform((value) => value as ProfileId);

/**
 * A publication identifier.
 */
export type PublicationId = Brand<string, 'PublicationId'>;
/**
 * @internal
 */
export const PublicationIdSchema: z.Schema<PublicationId, z.ZodTypeDef, string> =
  notEmptyString().transform((value) => value as PublicationId);
