/**
 * Branding helper type.
 *
 * @internal
 */
export type Brand<T, TBrand, ReservedName extends string = '__type__'> = T & {
  [K in ReservedName]: TBrand;
};

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

export type NonEmptyArray<T> = [T, ...T[]];

/**
 * @internal
 */
export function hasAtLeastOne<T>(items: ReadonlyArray<T>): items is NonEmptyArray<T> {
  return items.length > 0;
}

/**
 * @internal
 */
export function assertNonEmptyArray<T>(items: ReadonlyArray<T>): asserts items is NonEmptyArray<T> {
  invariant(
    hasAtLeastOne(items),
    `Expected array of to have at least one item, but received 0 items`,
  );
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
