import { z } from 'zod';

import { formatZodError } from './formatters.js';
import { type Brand, invariant, never } from './utils.js';

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

// using ranges instead of `i` flag so that resulting JSON Schema includes case-insensitivity.
const localeRegex = /^[a-z]{2}(?:-[a-zA-Z]{2})?$/;
const localeLikeRegex = /^([a-z]{2})(?:-[A-Z0-9]{2,3})?$/i;

const LocaleRegexSchema = z
  .string({
    description:
      'A Locale Identifier in the `[language]` OR `[language]-[region]` format (e.g. `en`, `en-GB`, `it`). ' +
      '[language] MUST be in the ISO 639-1 format. [region], if provided, MUST be in the ISO 3166-1 alpha-2 format.',
  })
  .regex(
    localeRegex,
    'Should be a valid Locale Identifier. Expected `[language]` OR `[language]-[region]` format (e.g. `en`, `en-GB`, `it`). ' +
      '[language] MUST be in the ISO 639-1 format. [region], if provided, MUST be in the ISO 3166-1 alpha-2 format.',
  );

/**
 * @internal
 */
export const LocaleSchema: z.ZodType<Locale, z.ZodTypeDef, unknown> = LocaleRegexSchema.catch(
  (ctx) => {
    // attempts to recover the language code at least
    const match = localeLikeRegex.exec(ctx.input);
    if (match) {
      return match[1] as string;
    }
    return ctx.input;
  },
)
  .superRefine((val, ctx): val is Locale => {
    const exact = LocaleRegexSchema.safeParse(val);

    if (!exact.success) {
      for (const issue of exact.error.issues) {
        ctx.addIssue(issue);
      }
    }
    return z.NEVER;
  })
  .transform(toLocale);

/**
 * @internal
 */
export function nonEmptySchema(schema: z.ZodString): z.ZodType<string, z.ZodTypeDef, unknown> {
  return z.preprocess((val, ctx) => {
    const result = z.string().safeParse(val);

    if (!result.success) {
      for (const issue of result.error.issues) {
        // why fatal = true? see: https://github.com/colinhacks/zod/pull/2912#issuecomment-2010989328
        ctx.addIssue({ ...issue, fatal: true });
      }
      return z.NEVER;
    }

    return result.data
      .replace(/^[\u0000\u0007\u000e\u000f\u200b-\u200d\ufeff]*/, '')
      .replace(/[\u0000\u0007\u000e\u000f\u200b-\u200d\ufeff]*$/, '')
      .trim();
  }, schema.min(1));
}

/**
 * @internal
 */
export const NonEmptyStringSchema = nonEmptySchema(z.string());

/**
 * An arbitrary label.
 *
 * All lowercased, 50 characters max.
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
export const TagSchema: z.ZodType<Tag, z.ZodTypeDef, string> = z
  .string()
  .describe('An arbitrary tag.')
  .min(1)
  .max(50)
  .transform((value) => toTag(value.toLowerCase()));

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
export const SignatureSchema: z.ZodType<Signature, z.ZodTypeDef, unknown> = z
  .string()
  .min(1)
  .describe('A cryptographic signature of the Lens metadata.')
  .transform(toSignature);

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
export const MarkdownSchema: z.ZodType<Markdown, z.ZodTypeDef, unknown> =
  NonEmptyStringSchema.transform(toMarkdown);

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
function toURI(value: string): URI {
  return value as URI;
}

/**
 * @internal
 */
export const URISchema = z
  .string({ description: 'A Uniform Resource Identifier.' })
  .min(6) // [ar://.]
  .url({ message: 'Should be a valid URI' }) // reads url() but works well with URIs too and uses format: 'uri' in the JSON schema
  .transform(toURI);

const geoUriRegex = /^geo:(-?\d+\.?\d*),(-?\d+\.?\d*)$/;

const LatitudeSchema = z.coerce.number({ description: 'The latitude.' }).min(-90).max(90);

const LongitudeSchema = z.coerce.number({ description: 'The longitude.' }).min(-180).max(180);

/**
 * A Geographic coordinate as subset of Geo URI (RFC 5870).
 *
 * Currently only supports the `geo:lat,lng` format.
 *
 * Use the {@link geoUri} helper to create one, do not attempt to create one manually.
 *
 * @example
 * ```ts
 * 'geo:40.689247,-74.044502'
 *
 * 'geo:41.890209,12.492231'
 * ```
 *
 * @see https://tools.ietf.org/html/rfc5870
 */
export type GeoURI = `geo:${number},${number}`;
/**
 * @internal
 */
export const GeoURISchema = z
  .string()
  .describe(
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
      for (const issue of latResult.error.issues) {
        ctx.addIssue({
          ...issue,
          path: [...ctx.path, 'lat'],
        });
      }
    }

    const lngResult = LongitudeSchema.safeParse(longitude);
    if (!lngResult.success) {
      for (const issue of lngResult.error.issues) {
        ctx.addIssue({
          ...issue,
          path: [...ctx.path, 'lng'],
        });
      }
    }

    return z.NEVER;
  });

/**
 * A geographic point on the Earth.
 */
export type GeoPoint = {
  /**
   * The latitude in decimal degrees (from -90° to +90°).
   */
  lat: number;

  /**
   * The longitude in decimal degrees (from -180° to +180°).
   */
  lng: number;
};
/**
 * @internal
 */
export const GeoPointSchema: z.ZodType<GeoPoint, z.ZodTypeDef, object> = z.object({
  lat: LatitudeSchema,
  lng: LongitudeSchema,
});

/**
 * Helper to create a Geo URI from a {@link GeoPoint}.
 *
 * @category Helpers
 * @example
 * ```ts
 * geoUri({ lat: 40.689247, lng: -74.044502 }) // 'geo:40.689247,-74.044502'
 *
 * geoUri({ lat: 41.890209, lng: 12.492231 }) // 'geo:41.890209,12.492231'
 * ```
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
 * Helper to parse a {@link GeoPoint} from a {@link GeoURI}.
 *
 * @category Helpers
 */
export function geoPoint(value: GeoURI): GeoPoint {
  const uri = GeoURISchema.parse(value);

  const match = geoUriRegex.exec(uri);

  invariant(match, 'Invalid Geo URI format. Expected `geo:lat,lng`.');

  const [, lat = '', lng = ''] = match;
  return GeoPointSchema.parse({ lat, lng });
}

/**
 * The address of a physical location.
 */
export type PhysicalAddress = {
  /**
   * The full mailing address formatted for display.
   */
  formatted?: string;
  /**
   * The street address including house number, street name, P.O. Box,
   * apartment or unit number and extended multi-line address information.
   */
  streetAddress?: string;
  /**
   * The city or locality.
   */
  locality: string;
  /**
   * The state or region.
   */
  region?: string;
  /**
   * The zip or postal code.
   */
  postalCode?: string;
  /**
   * The country name component.
   */
  country: string;
};
/**
 * @internal
 */
export const PhysicalAddressSchema: z.ZodType<PhysicalAddress, z.ZodTypeDef, object> = z.object({
  formatted: NonEmptyStringSchema.describe(
    'The full mailing address formatted for display.',
  ).optional(),
  streetAddress: NonEmptyStringSchema.describe(
    'The street address including house number, street name, P.O. Box, ' +
      'apartment or unit number and extended multi-line address information.',
  ).optional(),
  locality: NonEmptyStringSchema.describe('The city or locality.'),
  region: NonEmptyStringSchema.describe('The state or region.').optional(),
  postalCode: NonEmptyStringSchema.describe('The zip or postal code.').optional(),
  country: NonEmptyStringSchema.describe('The country name component.'),
});

/**
 * An ISO 8601 in the JS simplified format: `YYYY-MM-DDTHH:mm:ss.sssZ`.
 */
export type DateTime = Brand<string, 'DateTime'>;
/**
 * @internal
 */
export function toDateTime(value: string): DateTime {
  return value as DateTime;
}
/**
 * @internal
 */
export const DateTimeSchema = z.string().datetime().transform(toDateTime);

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
export const EvmAddressSchema: z.ZodType<EvmAddress, z.ZodTypeDef, unknown> = z
  .string()
  .length(42)
  .describe('An EVM compatible address.')
  .transform(toEvmAddress);

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
export const ChainIdSchema: z.ZodType<ChainId, z.ZodTypeDef, unknown> = z
  .number()
  .positive()
  .transform(toChainId);
