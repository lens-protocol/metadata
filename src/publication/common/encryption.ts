/* eslint-disable no-case-declarations */
import { z } from 'zod';

import {
  AmountSchema,
  EvmAddressSchema,
  NetworkAddressSchema,
  ProfileIdSchema,
  PublicationIdSchema,
  TokenIdSchema,
  nonEmptyStringSchema,
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

/**
 * @internal
 */
export const NftOwnershipConditionSchema = z.object({
  contractType: z.nativeEnum(NftContractType),
  type: z.literal(ConditionType.NFT_OWNERSHIP),
  contract: NetworkAddressSchema,
  tokenIds: TokenIdSchema.array()
    .min(1)
    .optional()
    .describe(
      'A list of token IDs you want to check ownership of. The list is optional for ERC721, ' +
        'you MUST provide a list of token IDs for ERC1155.',
    ),
});
export type NftOwnershipCondition = z.infer<typeof NftOwnershipConditionSchema>;

export function nftOwnershipCondition(
  input: Omit<NftOwnershipCondition, 'type'>,
): NftOwnershipCondition {
  return NftOwnershipConditionSchema.parse({
    type: ConditionType.NFT_OWNERSHIP,
    ...input,
  });
}

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

export function profileOwnershipCondition(input: Omit<ProfileOwnershipCondition, 'type'>) {
  return ProfileOwnershipConditionSchema.parse({
    type: ConditionType.PROFILE_OWNERSHIP,
    ...input,
  });
}

/**
 * @internal
 */
export const FollowConditionSchema = z.object({
  type: z.literal(ConditionType.FOLLOW),
  follow: ProfileIdSchema,
});
export type FollowCondition = z.infer<typeof FollowConditionSchema>;

export function followCondition(input: Omit<FollowCondition, 'type'>) {
  return FollowConditionSchema.parse({
    type: ConditionType.FOLLOW,
    ...input,
  });
}

/**
 * @internal
 */
export const CollectConditionSchema = z.object({
  type: z.literal(ConditionType.COLLECT),
  publicationId: PublicationIdSchema,
  thisPublication: z.boolean().optional().default(false),
});
export type CollectCondition = z.infer<typeof CollectConditionSchema>;

export type SimpleCondition =
  | CollectCondition
  | EoaOwnershipCondition
  | Erc20OwnershipCondition
  | FollowCondition
  | NftOwnershipCondition
  | ProfileOwnershipCondition;

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
export type AnyCondition =
  | SimpleCondition
  | AndCondition<SimpleCondition>
  | OrCondition<SimpleCondition>;

function refineAnyCondition(condition: AnyCondition, ctx: z.RefinementCtx) {
  if (condition.type === ConditionType.AND || condition.type === ConditionType.OR) {
    condition.criteria.forEach((c, idx) =>
      refineAnyCondition(c, { ...ctx, path: [...ctx.path, 'criteria', idx] }),
    );
  }
  if (
    condition.type === ConditionType.NFT_OWNERSHIP &&
    condition.contractType === NftContractType.ERC1155
  ) {
    if (condition.tokenIds === undefined || condition.tokenIds.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'ERC1155 requires at least one token id.',
        path: [...ctx.path, 'tokenIds'],
      });
    }
  }
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
]).superRefine(({ criteria }, ctx) => {
  criteria.forEach((condition, idx) => {
    refineAnyCondition(condition, {
      ...ctx,
      path: [...ctx.path, 'criteria', idx],
    });
  });
});
export type AccessCondition = z.infer<typeof AccessConditionSchema>;

/**
 * A symmetric encryption key.
 */
export type LitEncryptionKey = Brand<string, 'LitEncryptionKey'>;
/**
 * @internal
 */
export function toLitEncryptionKey(value: string): LitEncryptionKey {
  return value as LitEncryptionKey;
}
/**
 * @internal
 */
export const LitEncryptionKeySchema: z.Schema<LitEncryptionKey, z.ZodTypeDef, string> =
  nonEmptyStringSchema('A symmetric encryption key.')
    .length(368, 'Encryption key should be 368 characters long.')
    .transform(toLitEncryptionKey);

/**
 * @internal
 */
export const EncryptedPaths = nonEmptyStringSchema(
  'An encrypted path is a string of keys separated by . that describe ' +
    'a path to a value in a JSON object (e.g. lens.attachments.0.item.url, lens.content).',
)
  .array()
  .min(1);
export type EncryptedPaths = z.infer<typeof EncryptedPaths>;

/**
 * @internal
 */
export const LitEncryptionStrategySchema = z.object(
  {
    provider: z.literal(EncryptionProvider.LIT_PROTOCOL),
    encryptionKey: LitEncryptionKeySchema,
    accessCondition: AccessConditionSchema,
    encryptedPaths: EncryptedPaths,
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
