import { z } from 'zod';

import { nonEmptyStringSchema } from './primitives.js';

/**
 * The type of a metadata attribute.
 */
export enum MetadataAttributeType {
  BOOLEAN = 'Boolean',
  DATE = 'Date',
  NUMBER = 'Number',
  STRING = 'String',
  JSON = 'JSON',
}

export type BooleanAttribute = {
  /**
   * A JS boolean value serialized as string. It's consumer responsibility to parse it.
   */
  value: 'true' | 'false';
  /**
   * Union discriminant.
   */
  type: MetadataAttributeType.BOOLEAN;
  /**
   * The attribute's unique identifier.
   */
  key: string;
};
/**
 * @internal
 */
export const BooleanAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.BOOLEAN),
  key: nonEmptyStringSchema("The attribute's unique identifier."),
  value: z
    .enum(['true', 'false'])
    .describe("A JS boolean value serialized as string. It's consumer responsibility to parse it."),
});

export type DateAttribute = {
  /**
   * A valid ISO 8601 date string.  It's consumer responsibility to parse it.
   */
  value: string;
  /**
   * Union discriminant.
   */
  type: MetadataAttributeType.DATE;
  /**
   * The attribute's unique identifier.
   */
  key: string;
};
/**
 * @internal
 */
export const DateAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.DATE),
  key: nonEmptyStringSchema("The attribute's unique identifier."),
  value: z
    .string()
    .datetime()
    .describe("A valid ISO 8601 date string.  It's consumer responsibility to parse it."),
});

export type NumberAttribute = {
  /**
   * A valid JS number serialized as string. It's consumer responsibility to parse it.
   *
   * @example
   * ```typescript
   * '42'
   *
   * '42n'
   *
   * '42.42'
   * ```
   */
  value: string;
  /**
   * Union discriminant.
   */
  type: MetadataAttributeType.NUMBER;
  /**
   * The attribute's unique identifier.
   */
  key: string;
};
/**
 * @internal
 */
export const NumberAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.NUMBER),
  key: nonEmptyStringSchema("The attribute's unique identifier."), // TODO generalize and share
  value: nonEmptyStringSchema(
    "A valid JS number serialized as string. It's consumer responsibility to parse it.",
  ),
});

export type StringAttribute = {
  /**
   * Any string value.
   */
  value: string;
  /**
   * Union discriminant.
   */
  type: MetadataAttributeType.STRING;
  /**
   * The attribute's unique identifier.
   */
  key: string;
};
/**
 * @internal
 */
export const StringAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.STRING),
  key: nonEmptyStringSchema("The attribute's unique identifier."),
  value: nonEmptyStringSchema('A string value.'),
});

export type JSONAttribute = {
  /**
   * A JSON string. It's consumer responsibility to validate and parse it.
   */
  value: string;
  /**
   * Union discriminant.
   */
  type: MetadataAttributeType.JSON;
  /**
   * Union discriminant.
   */
  /**
   * The attribute's unique identifier.
   */
  key: string;
};
/**
 * @internal
 */
export const JSONAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.JSON),
  key: nonEmptyStringSchema("The attribute's unique identifier."),
  value: nonEmptyStringSchema(
    "A JSON string. It's consumer responsibility to validate and parse it.",
  ),
});

/**
 * A Lens metadata attribute.
 */
export type MetadataAttribute =
  | BooleanAttribute
  | DateAttribute
  | NumberAttribute
  | StringAttribute
  | JSONAttribute;

export const MetadataAttributeSchema = z.discriminatedUnion('type', [
  BooleanAttributeSchema,
  DateAttributeSchema,
  NumberAttributeSchema,
  StringAttributeSchema,
  JSONAttributeSchema,
]);
