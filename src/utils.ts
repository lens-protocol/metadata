import { Signature } from './primitives';

/**
 * Branding helper type.
 *
 * @internal
 */
export type Brand<T, TBrand, ReservedName extends string = '__type__'> = T & {
  [K in ReservedName]: TBrand;
};

/**
 * Omits properties from an union type, preserving the union.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

/**
 * Overwrites properties from T1 with one from T2
 * @internal
 * @example
 * ```ts
 * Overwrite<{ foo: boolean, bar: string }, { foo: number }> // { foo: number, bar: string }
 * ```
 */
export type Overwrite<T1, T2> = DistributiveOmit<T1, keyof T2> & T2;

/**
 * An error that occurs when a task violates a logical condition that is assumed to be true at all times.
 */
export class InvariantError extends Error {
  name = 'InvariantError' as const;
}

/**
 * Asserts that the given condition is truthy
 * @internal
 *
 * @param condition - Either truthy or falsy value
 * @param message - An error message
 */
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}
/**
 * A function that throws when called.
 *
 * @param message - An error message
 */
export function never(message = 'Unexpected call to never()'): never {
  throw new InvariantError(message);
}

/**
 * Specifies an object with unknown keys
 *
 * Useful when you don't care about exact props passed to the component.
 * @privateRemarks Don't use `{}` as a type. `{}` actually means "any non-nullish value".
 */
export type UnknownObject = Record<string, unknown>;

/**
 * Declares an array of at least one element of the specified type.
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * @internal
 */
export function hasAtLeastOne<T>(items: ReadonlyArray<T>): items is NonEmptyArray<T> {
  return items.length > 0;
}

/**
 * Declares an array of at least two elements of the specified type.
 */
export type TwoAtLeastArray<T> = [T, T, ...T[]];

/**
 * @internal
 */
export function hasTwoOrMore<T>(items: ReadonlyArray<T>): items is TwoAtLeastArray<T> {
  return items.length >= 2;
}

/**
 * Beautify the  readout of all of the members of that intersection.
 *
 * As seen on tv: https://x.com/mattpocockuk/status/1622730173446557697
 *
 * @internal
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

/**
 * @internal
 */
export type ShapeCheck<T> = T extends {
  $schema: string;

  lens: unknown;

  signature?: Signature;
}
  ? T
  : never;
