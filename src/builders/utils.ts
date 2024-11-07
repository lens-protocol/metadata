import { PostMetadata } from '../post';
import { Brand, Overwrite } from '../utils.js';

/**
 * @internal
 */
type BrandOf<A> = [A] extends [Brand<unknown, infer R>] ? R : never;
/**
 * @internal
 */

export type RecursiveUnbrand<T> = T extends Brand<infer R, BrandOf<T>>
  ? R
  : {
    [K in keyof T]: RecursiveUnbrand<T[K]>;
  };
/**
 * @internal
 */
type ExtractLensSpec<T extends { lens: unknown }> = T['lens'];
/**
 * @internal
 */
type OmitInferredPostFields<T> = Omit<T, 'mainContentFocus'>;
/**
 * @internal
 */
type PostDefaults<Details extends ExtractLensSpec<PostMetadata>> = Overwrite<
  Details,
  {
    /**
     * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
     *
     * @defaultValue a UUID
     */
    id?: string;
    /**
     * The language of the post.
     *
     * It's a locale string in the format of `<language>-<region>` or just `<language>`, where:
     * - `language` is a two-letter ISO 639-1 language code, e.g. `en` or `it`
     * - `region` is a two-letter ISO 3166-1 alpha-2 region code, e.g. `US` or `IT`
     *
     * You can just pass in the language tag if you do not know the region or don't need to be specific.
     *
     * @defaultValue `en`
     */
    locale?: string;
  }
>;

/**
 * @internal
 */
export type InputForPostMetadataDetails<T extends PostMetadata['lens']> = RecursiveUnbrand<
  OmitInferredPostFields<PostDefaults<T>>
>;
