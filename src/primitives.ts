import { z } from 'zod';

import { formatZodError } from './formatters.js';
import { Brand, invariant, never } from './utils.js';

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
 * An encrypted value.
 */
export type EncryptedString = Brand<string, 'EncryptedValue'>;
function toEncryptedString(value: string): EncryptedString {
  return value as EncryptedString;
}

function allFailed<Input>(
  results: z.SafeParseReturnType<Input, unknown>[],
): results is z.SafeParseError<Input>[] {
  return results.every((r) => !r.success);
}

/**
 * @internal
 */
export const EncryptedStringSchema = nonEmptyStringSchema('An encrypted value.')
  .regex(
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, // base64 regex
    'Should be encrypted and base64 encoded.',
  )
  .transform(toEncryptedString);

function encryptableSchema<T extends string>(schema: z.ZodType<T>) {
  const options = [schema, EncryptedStringSchema] as const;
  return z
    .union(options)
    .catch((ctx) => ctx.input as T)
    .superRefine((val, ctx) => {
      const results = options.map((s) => s.safeParse(val));

      if (allFailed(results)) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_union,
          unionErrors: results.map((r) => r.error),
        });
      }
    });
}

/**
 * @internal
 */
export function nonEmptyStringSchema(description?: string) {
  return z.string({ description }).min(1);
}
/**
 * @internal
 */
export function encryptableStringSchema(description: string) {
  return encryptableSchema(nonEmptyStringSchema(description));
}

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
export const TagSchema: z.Schema<Tag, z.ZodTypeDef, string> = nonEmptyStringSchema(
  'An arbitrary tag.',
)
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
  nonEmptyStringSchema('A Lens App identifier.').transform(toAppId);

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
export const SignatureSchema: z.Schema<Signature, z.ZodTypeDef, string> = nonEmptyStringSchema(
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
export const MarkdownSchema = nonEmptyStringSchema('A markdown text.').transform(toMarkdown);
/**
 * @internal
 */
export function markdownSchema(description: string): z.Schema<Markdown, z.ZodTypeDef, string> {
  return MarkdownSchema.describe(description);
}
/**
 * @internal
 */
export function encryptableMarkdownSchema(description: string) {
  return encryptableSchema(markdownSchema(description));
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
    .url({ message: 'Should be a valid URI' }) // reads url() but works well with URIs too and uses format: 'uri' in the JSON schema
    .transform(toUri);
}
/**
 * @internal
 */
export function encryptableUriSchema(description?: string) {
  return encryptableSchema(uriSchema(description));
}

const geoUriRegex = /^geo:(-?\d+\.?\d*),(-?\d+\.?\d*)$/;

const LatitudeSchema = z.coerce.number({ description: 'The latitude.' }).min(-90).max(90);

const LongitudeSchema = z.coerce.number({ description: 'The longitude.' }).min(-180).max(180);

/**
 * A Geographic coordinate as subset of Geo URI (RFC 5870).
 *
 * Currently only supports the `geo:lat,lng` format.
 *
 * @see https://tools.ietf.org/html/rfc5870
 */
export type GeoURI = `geo:${number},${number}`;
/**
 * @internal
 */
export const GeoURISchema = nonEmptyStringSchema(
  'A Geographic coordinate as subset of Geo URI (RFC 5870). ' +
    'Currently only supports the `geo:lat,lng` format.',
)
  .regex(geoUriRegex, 'Should be a Geo URI. Expected `geo:lat,lng`.')
  .superRefine((val, ctx): val is GeoURI => {
    const match = geoUriRegex.exec(val);

    if (!match) {
      // should never happen
      return z.NEVER;
    }

    const [, latitude = '', longitude = ''] = match;

    const latResult = LatitudeSchema.safeParse(latitude);
    if (!latResult.success) {
      latResult.error.issues.forEach((issue) =>
        ctx.addIssue({
          ...issue,
          path: [...ctx.path, 'lat'],
        }),
      );
    }

    const lngResult = LongitudeSchema.safeParse(longitude);
    if (!lngResult.success) {
      lngResult.error.issues.forEach((issue) =>
        ctx.addIssue({
          ...issue,
          path: [...ctx.path, 'lng'],
        }),
      );
    }

    return z.NEVER;
  });

const GeoPointSchema = z.object({
  lat: LatitudeSchema,
  lng: LongitudeSchema,
});

/**
 * A geographic point.
 */
export type GeoPoint = z.infer<typeof GeoPointSchema>;
/**
 * Helper to create a Geo URI from a {@link GeoPoint}.
 */
export function geoUri(point: GeoPoint): GeoURI {
  const result = GeoPointSchema.safeParse(point);

  if (result.success) {
    const { lat, lng } = result.data;
    return `geo:${lat},${lng}`;
  }

  never(formatZodError(result.error));
}

/**
 * Helper to extract a {@link GeoPoint} from a Geo URI.
 */
export function geoPoint(value: GeoURI): GeoPoint {
  const uri = GeoURISchema.parse(value);

  const match = geoUriRegex.exec(uri);

  invariant(match, 'Invalid Geo URI format. Expected `geo:lat,lng`.');

  const [, lat = '', lng = ''] = match;
  return GeoPointSchema.parse({ lat, lng });
}
/**
 * @internal
 */
export function encryptableGeoUriSchema(description: string) {
  return encryptableSchema(GeoURISchema.describe(description));
}

/**
 * @internal
 */
export const AddressSchema = z.object({
  formatted: encryptableStringSchema('The full mailing address formatted for display.').optional(),
  streetAddress: encryptableStringSchema(
    'The street address including house number, street name, P.O. Box, ' +
      'apartment or unit number and extended multi-line address information.',
  ).optional(),
  locality: encryptableStringSchema('The city or locality.'),
  region: encryptableStringSchema('The state or region.').optional(),
  postalCode: encryptableStringSchema('The zip or postal code.').optional(),
  country: encryptableStringSchema('The country name component.'),
});
/**
 * A physical address.
 */
export type Address = z.infer<typeof AddressSchema>;

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
 * @internal
 */
export function encryptableDatetimeSchema(description: string) {
  return encryptableSchema(datetimeSchema(description));
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
export const EvmAddressSchema: z.Schema<EvmAddress, z.ZodTypeDef, string> = nonEmptyStringSchema(
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
  nonEmptyStringSchema().transform(toTokenId);

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
    value: nonEmptyStringSchema(
      'The amount in the smallest unit of the currency (e.g. wei for ETH).',
    ),
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
  nonEmptyStringSchema().transform(toProfileId);

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
  nonEmptyStringSchema().transform(toPublicationId);
