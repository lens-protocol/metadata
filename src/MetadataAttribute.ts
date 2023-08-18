import { z } from 'zod';

import { notEmptyString } from './primitives';

export enum MetadataAttributeType {
  Boolean = 'Boolean',
  Date = 'Date',
  Number = 'Number',
  String = 'String',
  JSON = 'JSON',
}

export const BooleanAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.Boolean),
  key: notEmptyString("The attribute's unique identifier."),
  value: z
    .enum(['true', 'false'])
    .describe("A boolean value serialized as string.  It's consumer responsibility to parse it."),
});
export type BooleanAttribute = z.infer<typeof BooleanAttributeSchema>;

export const DateAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.Date),
  key: notEmptyString("The attribute's unique identifier."),
  value: z
    .string()
    .datetime()
    .describe("A valid ISO 8601 date string.  It's consumer responsibility to parse it."),
});
export type DateAttribute = z.infer<typeof DateAttributeSchema>;

export const NumberAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.Number),
  key: notEmptyString("The attribute's unique identifier."),
  value: notEmptyString(
    "A valid JS number serialized as string. It's consumer responsibility to parse it.",
  ),
});
export type NumberAttribute = z.infer<typeof NumberAttributeSchema>;

export const StringAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.String),
  key: notEmptyString("The attribute's unique identifier."),
  value: notEmptyString('A string value.'),
});
export type StringAttribute = z.infer<typeof StringAttributeSchema>;

export const JSONAttributeSchema = z.object({
  type: z.literal(MetadataAttributeType.JSON),
  key: notEmptyString("The attribute's unique identifier."),
  value: notEmptyString("A valid JSON string. It's consumer responsibility to parse it."),
});
export type JSONAttribute = z.infer<typeof JSONAttributeSchema>;

export const MetadataAttributeSchema = z.discriminatedUnion('type', [
  BooleanAttributeSchema,
  DateAttributeSchema,
  NumberAttributeSchema,
  StringAttributeSchema,
  JSONAttributeSchema,
]);
export type MetadataAttribute = z.infer<typeof MetadataAttributeSchema>;
