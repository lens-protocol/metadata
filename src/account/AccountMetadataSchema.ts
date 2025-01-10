import { z } from 'zod';

import { type MetadataAttribute, MetadataAttributeSchema } from '../MetadataAttribute.js';
import {
  type Markdown,
  MarkdownSchema,
  NonEmptyStringSchema,
  type Signature,
  SignatureSchema,
  type URI,
  URISchema,
} from '../primitives.js';
import { AccountSchemaId } from './AccountSchemaId.js';

export type AccountMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The Account display name.
   */
  name?: string;
  /**
   * The Account bio as markdown.
   */
  bio?: Markdown;
  /**
   * The Account picture.
   */
  picture?: URI;
  /**
   * The Account cover picture.
   */
  coverPicture?: URI;
  /**
   * A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.
   * Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.
   */
  attributes?: MetadataAttribute[];
};
/**
 * @internal
 */
const AccountMetadataDetailsSchema: z.ZodType<AccountMetadataDetails, z.ZodTypeDef, object> =
  z.object(
    {
      id: NonEmptyStringSchema.describe(
        'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
      ),

      name: NonEmptyStringSchema.describe('The Account display name.').optional(),

      bio: MarkdownSchema.describe('The Account bio as markdown.').optional(),

      picture: URISchema.describe('The Account picture.').optional(),

      coverPicture: URISchema.describe('The Account cover picture.').optional(),

      attributes: MetadataAttributeSchema.array()
        .min(1)
        .optional()
        .describe(
          'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
            'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
        ),
    },
    { description: 'The Lens specific metadata details.' },
  );

export type AccountMetadata = {
  /**
   * The schema id.
   */
  $schema: AccountSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: AccountMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * Account Metadata schema.
 *
 * @category Parse
 *
 * @example
 * with `parse`:
 * ```ts
 * AccountMetadataSchema.parse(valid); // => AccountMetadata
 *
 * AccountMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```ts
 * AccountMetadataSchema.safeParse(valid);
 * // => { success: true, data: AccountMetadata }
 *
 * AccountMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const AccountMetadataSchema: z.ZodType<AccountMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(AccountSchemaId.LATEST),
  lens: AccountMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
