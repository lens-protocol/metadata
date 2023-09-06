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
export function toLocale(value: string): Locale {
  return value as Locale;
}
/**
 * @internal
 */
export const LocaleSchema: z.Schema<Locale, z.ZodTypeDef, string> = z
  .string({
    description: 'A locale identifier.',
  })
  .min(2)
  .max(5)
  .transform(toLocale);

/**
 * An arbitrary tag.
 */
export type Tag = Brand<string, 'Tag'>;
/**
 * @internal
 */
export function toTag(value: string): Tag {
  return value as Tag;
}
/**
 * @internal
 */
export const TagSchema: z.Schema<Tag, z.ZodTypeDef, string> = notEmptyString('An arbitrary tag.')
  .max(50)
  .transform((value) => toTag(value.toLowerCase()));

/**
 * A Lens App identifier.
 */
export type AppId = Brand<string, 'AppId'>;
/**
 * @internal
 */
export function toAppId(value: string): AppId {
  return value as AppId;
}
/**
 * @internal
 */
export const AppIdSchema: z.Schema<AppId, z.ZodTypeDef, string> =
  notEmptyString('A Lens App identifier.').transform(toAppId);

/**
 * A cryptographic signature.
 */
export type Signature = Brand<string, 'Signature'>;
/**
 * @internal
 */
export function toSignature(value: string): Signature {
  return value as Signature;
}
/**
 * @internal
 */
export const SignatureSchema: z.Schema<Signature, z.ZodTypeDef, string> = notEmptyString(
  'A cryptographic signature of the Lens metadata.',
).transform(toSignature);

/**
 * A markdown text.
 */
export type Markdown = Brand<string, 'Markdown'>;
/**
 * @internal
 */
export function toMarkdown(value: string): Markdown {
  return value as Markdown;
}
/**
 * @internal
 */
export function markdownSchema(description: string): z.Schema<Markdown, z.ZodTypeDef, string> {
  return notEmptyString(description).transform(toMarkdown);
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
export function toUri(value: string): URI {
  return value as URI;
}
/**
 * @internal
 */
export function uriSchema(
  description: string = 'A Uniform Resource Identifier. ',
): z.Schema<URI, z.ZodTypeDef, string> {
  return z
    .string({ description })
    .min(6) // [ar://.]
    .url() // reads url() but works well with URIs too and uses format: 'uri' in the JSON schema
    .transform(toUri);
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
export function toDatetime(value: string): Datetime {
  return value as Datetime;
}
/**
 * @internal
 */
export function datetimeSchema(description: string): z.Schema<Datetime, z.ZodTypeDef, string> {
  return z.string({ description }).datetime().transform(toDatetime);
}

/**
 * An EVM compatible address.
 */
export type EvmAddress = Brand<string, 'EvmAddress'>;
/**
 * @internal
 */
export function toEvmAddress(value: string): EvmAddress {
  return value as EvmAddress;
}
/**
 * @internal
 */
export const EvmAddressSchema: z.Schema<EvmAddress, z.ZodTypeDef, string> = notEmptyString(
  'An EVM compatible address.',
).transform(toEvmAddress);

/**
 * An EVM compatible Chain Id.
 */
export type ChainId = Brand<number, 'ChainId'>;
/**
 * @internal
 */
export function toChainId(value: number): ChainId {
  return value as ChainId;
}
/**
 * @internal
 */
export const ChainIdSchema: z.Schema<ChainId, z.ZodTypeDef, number> = z
  .number()
  .positive()
  .transform(toChainId);

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
export function toTokenId(value: string): TokenId {
  return value as TokenId;
}
/**
 * @internal
 */
export const TokenIdSchema: z.Schema<TokenId, z.ZodTypeDef, string> =
  notEmptyString().transform(toTokenId);

/**
 * @internal
 */
export const AssetSchema = z.object({
  contract: NetworkAddressSchema,
  decimals: z.number({ description: 'The number of decimals of the asset.' }).nonnegative(),
});
/**
 * A blockchain asset.
 */
export type Asset = z.infer<typeof AssetSchema>;
/**
 * @internal
 */
export function asset(contract: NetworkAddress, decimals: number): Asset {
  return { contract, decimals };
}

/**
 * @internal
 */
export const AmountSchema = z.object(
  {
    asset: AssetSchema,
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
export function toProfileId(value: string): ProfileId {
  return value as ProfileId;
}
/**
 * @internal
 */
export const ProfileIdSchema: z.Schema<ProfileId, z.ZodTypeDef, string> =
  notEmptyString().transform(toProfileId);

/**
 * A publication identifier.
 */
export type PublicationId = Brand<string, 'PublicationId'>;
/**
 * @internal
 */
export function toPublicationId(value: string): PublicationId {
  return value as PublicationId;
}
/**
 * @internal
 */
export const PublicationIdSchema: z.Schema<PublicationId, z.ZodTypeDef, string> =
  notEmptyString().transform(toPublicationId);
