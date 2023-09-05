import { z } from 'zod';

import {
  AmountSchema,
  EvmAddressSchema,
  NetworkAddressSchema,
  ProfileIdSchema,
  PublicationIdSchema,
  TokenIdSchema,
  notEmptyString,
} from '../../primitives.js';
import { hasTwoOrMore, Brand, assertHasTwoOrMore, TwoAtLeastArray } from '../../utils.js';

export enum EncryptionProvider {
  LIT_PROTOCOL = 'LIT_PROTOCOL',
}

export enum NftContractType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export enum ConditionType {
  NFT_OWNERSHIP = 'NFT_OWNERSHIP',
  ERC20_OWNERSHIP = 'ERC20_OWNERSHIP',
  EOA_OWNERSHIP = 'EOA_OWNERSHIP',
  PROFILE_OWNERSHIP = 'PROFILE_OWNERSHIP',
  FOLLOW = 'FOLLOW',
  COLLECT = 'COLLECT',
  AND = 'AND',
  OR = 'OR',
}

export const NftOwnershipConditionSchema = z.object({
  type: z.literal(ConditionType.NFT_OWNERSHIP),
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
  type: z.literal(ConditionType.ERC20_OWNERSHIP),
  amount: AmountSchema,
  condition: z.nativeEnum(ConditionComparisonOperator),
});
export type Erc20OwnershipCondition = z.infer<typeof Erc20OwnershipConditionSchema>;

/**
 * @internal
 */
export const EoaOwnershipConditionSchema = z.object({
  type: z.literal(ConditionType.EOA_OWNERSHIP),
  address: EvmAddressSchema,
});
export type EoaOwnershipCondition = z.infer<typeof EoaOwnershipConditionSchema>;

/**
 * @internal
 */
export const ProfileOwnershipConditionSchema = z.object({
  type: z.literal(ConditionType.PROFILE_OWNERSHIP),
  profileId: ProfileIdSchema,
});
export type ProfileOwnershipCondition = z.infer<typeof ProfileOwnershipConditionSchema>;

/**
 * @internal
 */
export const FollowConditionSchema = z.object({
  type: z.literal(ConditionType.FOLLOW),
  follow: ProfileIdSchema,
});
export type FollowCondition = z.infer<typeof FollowConditionSchema>;

/**
 * @internal
 */
export const CollectConditionSchema = z.object({
  type: z.literal(ConditionType.COLLECT),
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

type BaseCondition = {
  type: ConditionType;
};
type ComposableConditionSchema<T extends BaseCondition = BaseCondition> = z.ZodObject<
  {
    type: z.ZodTypeAny;
  } & z.ZodRawShape,
  z.UnknownKeysParam,
  z.ZodTypeAny,
  T
>;

export type AndCondition<T> = {
  type: ConditionType.AND;
  criteria: TwoAtLeastArray<T>;
};
export function andCondition<T>(options: T[]): AndCondition<T> {
  assertHasTwoOrMore(options);
  return {
    type: ConditionType.AND,
    criteria: options,
  };
}

function andConditionSchema<
  Criteria extends [
    ComposableConditionSchema,
    ComposableConditionSchema,
    ...ComposableConditionSchema[],
  ],
>(options: Criteria): ComposableConditionSchema<AndCondition<z.infer<Criteria[number]>>> {
  return z.object({
    type: z.literal(ConditionType.AND),
    criteria: z
      .discriminatedUnion('type', options)
      .array()
      .max(5, 'Invalid AND condition: should have at most 5 conditions')
      .refine(hasTwoOrMore, 'Invalid AND condition: should have at least 2 conditions'),
  });
}

export type OrCondition<T> = {
  type: ConditionType.OR;
  criteria: TwoAtLeastArray<T>;
};
export function orCondition<T>(options: T[]): OrCondition<T> {
  assertHasTwoOrMore(options);
  return {
    type: ConditionType.OR,
    criteria: options,
  };
}

function orConditionSchema<
  Criteria extends [
    ComposableConditionSchema,
    ComposableConditionSchema,
    ...ComposableConditionSchema[],
  ],
>(options: Criteria): ComposableConditionSchema<OrCondition<z.infer<Criteria[number]>>> {
  return z.object({
    type: z.literal(ConditionType.OR),
    criteria: z
      .discriminatedUnion('type', options)
      .array()
      .max(5, 'Invalid OR condition: should have at most 5 conditions')
      .refine(hasTwoOrMore, 'Invalid OR condition: should have at least 2 conditions'),
  });
}

/**
 * @internal
 */
export const AccessConditionSchema = orConditionSchema([
  NftOwnershipConditionSchema,
  Erc20OwnershipConditionSchema,
  EoaOwnershipConditionSchema,
  ProfileOwnershipConditionSchema,
  FollowConditionSchema,
  CollectConditionSchema,
  andConditionSchema([
    NftOwnershipConditionSchema,
    Erc20OwnershipConditionSchema,
    EoaOwnershipConditionSchema,
    ProfileOwnershipConditionSchema,
    FollowConditionSchema,
    CollectConditionSchema,
  ]),
  orConditionSchema([
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
export function litEncryptionKey(value: string): LitEncryptionKey {
  return value as LitEncryptionKey;
}
/**
 * @internal
 */
export const LitEncryptionKeySchema: z.Schema<LitEncryptionKey, z.ZodTypeDef, string> =
  notEmptyString('A symmetric encryption key.')
    .length(368, 'Encryption key should be 368 characters long.')
    .transform(litEncryptionKey);

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
