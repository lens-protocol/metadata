import { z } from 'zod';

import {
  AmountSchema,
  EvmAddressSchema,
  NetworkAddressSchema,
  ProfileIdSchema,
  PublicationIdSchema,
  TokenIdSchema,
  notEmptyString,
} from '../../primitives';
import { hasTwoOrMore, Brand } from '../../utils';

export enum EncryptionProvider {
  LIT_PROTOCOL = 'LIT_PROTOCOL',
}

export enum NftContractType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export const NftOwnershipConditionSchema = z.object({
  contract: NetworkAddressSchema,
  contractType: z.nativeEnum(NftContractType),
  tokenIds: TokenIdSchema.array()
    .min(1)
    .optional()
    .describe('An optional list of token IDs you want to check.'),
});
export type NftOwnershipCondition = z.infer<typeof NftOwnershipConditionSchema>;

export enum ConditionComparisonOperator {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
}

/**
 * @internal
 */
export const Erc20OwnershipConditionSchema = z.object({
  amount: AmountSchema,
  condition: z.nativeEnum(ConditionComparisonOperator),
});
export type Erc20OwnershipCondition = z.infer<typeof Erc20OwnershipConditionSchema>;

/**
 * @internal
 */
export const EoaOwnershipConditionSchema = z.object({
  address: EvmAddressSchema,
});
export type EoaOwnershipCondition = z.infer<typeof EoaOwnershipConditionSchema>;

/**
 * @internal
 */
export const ProfileOwnershipConditionSchema = z.object({
  profileId: ProfileIdSchema,
});
export type ProfileOwnershipCondition = z.infer<typeof ProfileOwnershipConditionSchema>;

/**
 * @internal
 */
export const FollowConditionSchema = z.object({
  follow: ProfileIdSchema,
});
export type FollowCondition = z.infer<typeof FollowConditionSchema>;

/**
 * @internal
 */
export const CollectConditionSchema = z.object({
  publicationId: PublicationIdSchema,
  thisPublication: z.boolean().optional().default(false),
});
export type CollectCondition = z.infer<typeof CollectConditionSchema>;

/**
 * @internal
 */
export const SimpleConditionSchema = z.union([
  NftOwnershipConditionSchema,
  Erc20OwnershipConditionSchema,
  EoaOwnershipConditionSchema,
  ProfileOwnershipConditionSchema,
  FollowConditionSchema,
  CollectConditionSchema,
]);
export type SimpleCondition = z.infer<typeof SimpleConditionSchema>;

export type AndCondition<T> = {
  and: [T, T, ...T[]];
};

function andCondition<
  Criteria extends [z.ZodType<unknown>, z.ZodType<unknown>, ...z.ZodType<unknown>[]],
>(options: Criteria): z.Schema<AndCondition<z.infer<Criteria[number]>>, z.ZodTypeDef, object> {
  return z.object({
    and: z
      .union(options)
      .array()
      .max(5, 'Invalid AND condition: should have at most 5 conditions')
      .refine(hasTwoOrMore, 'Invalid AND condition: should have at least 2 conditions'),
  });
}

export type OrCondition<T> = {
  or: [T, T, ...T[]];
};

function orCondition<
  Criteria extends [z.ZodType<unknown>, z.ZodType<unknown>, ...z.ZodType<unknown>[]],
>(options: Criteria): z.Schema<OrCondition<z.infer<Criteria[number]>>, z.ZodTypeDef, object> {
  return z.object({
    or: z
      .union(options)
      .array()
      .max(5, 'Invalid OR condition: should have at most 5 conditions')
      .refine(hasTwoOrMore, 'Invalid OR condition: should have at least 2 conditions'),
  });
}

/**
 * @internal
 */
export const AccessConditionSchema = orCondition([
  NftOwnershipConditionSchema,
  Erc20OwnershipConditionSchema,
  EoaOwnershipConditionSchema,
  ProfileOwnershipConditionSchema,
  FollowConditionSchema,
  CollectConditionSchema,
  andCondition([
    NftOwnershipConditionSchema,
    Erc20OwnershipConditionSchema,
    EoaOwnershipConditionSchema,
    ProfileOwnershipConditionSchema,
    FollowConditionSchema,
    CollectConditionSchema,
  ]),
  orCondition([
    NftOwnershipConditionSchema,
    Erc20OwnershipConditionSchema,
    EoaOwnershipConditionSchema,
    ProfileOwnershipConditionSchema,
    FollowConditionSchema,
    CollectConditionSchema,
  ]),
]);
export type AccessCondition = z.infer<typeof AccessConditionSchema>;

/**
 * A symmetric encryption key.
 */
export type LitEncryptionKey = Brand<string, 'LitEncryptionKey'>;
/**
 * @internal
 */
export const LitEncryptionKeySchema: z.Schema<LitEncryptionKey, z.ZodTypeDef, string> =
  notEmptyString('A symmetric encryption key.').transform((value) => value as LitEncryptionKey);

/**
 * @internal
 */
export const LitEncryptionStrategySchema = z.object(
  {
    provider: z.literal(EncryptionProvider.LIT_PROTOCOL),
    encryptionKey: LitEncryptionKeySchema,
    accessCondition: AccessConditionSchema,
  },
  {
    description: 'Publication encryption strategy powered by the LIT Protocol.',
  },
);
export type LitEncryptionStrategy = z.infer<typeof LitEncryptionStrategySchema>;

/**
 * @internal
 */
export const PublicationEncryptionStrategySchema = z.discriminatedUnion('provider', [
  LitEncryptionStrategySchema,
]);

/**
 * The publication encryption strategy.
 *
 * This is normally populated by the Lens SDK so the vast majority of developers will not need to use this directly.
 */
export type PublicationEncryptionStrategy = z.infer<typeof PublicationEncryptionStrategySchema>;
