import { z } from 'zod';

import { AccountSchemaId } from './AccountSchemaId.js';
import { MetadataAttribute, MetadataAttributeSchema } from '../MetadataAttribute.js';
import {
  AppId,
  AppIdSchema,
  Markdown,
  Signature,
  SignatureSchema,
  URI,
  NonEmptyStringSchema,
  UriSchema,
  MarkdownSchema,
} from '../primitives.js';

export type AccountMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The App Id that this Account details are relevant for.
   *
   * If omitted the data is considered to be the global Account data.
   */
  appId?: AppId;
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

      picture: UriSchema.describe('The Account picture.').optional(),

      coverPicture: UriSchema.describe('The Account cover picture.').optional(),

      attributes: MetadataAttributeSchema.array()
        .min(1)
        .optional()
        .describe(
          'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
          'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
        ),

      appId: AppIdSchema.optional().describe(
        'The App Id that this Account data refers to. ' +
        'If omitted the data is considered to be the global Account data.',
      ),
    },
    { description: 'The Lens specific metadata details.' },
  );

/**
 * Use this to create Account metadata objects.
 */
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