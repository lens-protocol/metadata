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
 *
 * @param condition - Either truthy or falsy value
 * @param message - An error message
 */
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

export type NotEmptyArray<T> = [T, ...T[]];

export function hasAtLeastOne<T>(items: ReadonlyArray<T>): items is NotEmptyArray<T> {
  return items.length > 0;
}

export function assertNotEmptyArray<T>(items: ReadonlyArray<T>): asserts items is NotEmptyArray<T> {
  invariant(
    hasAtLeastOne(items),
    `Expected array of to have at least one item, but received 0 items`,
  );
}
