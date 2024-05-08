/* eslint-disable no-case-declarations */
import { z } from 'zod';

import {
  Amount,
  AmountSchema,
  EvmAddress,
  EvmAddressSchema,
  NetworkAddress,
  NetworkAddressSchema,
  ProfileId,
  ProfileIdSchema,
  PublicationId,
  PublicationIdSchema,
  TokenId,
  TokenIdSchema,
  nonEmptyStringSchema,
} from '../../primitives.js';
import { hasTwoOrMore, Brand, TwoAtLeastArray } from '../../utils.js';

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
  ADVANCED_CONTRACT = 'ADVANCED_CONTRACT',
  AND = 'AND',
  OR = 'OR',
}

export type NftOwnershipCondition = {
  type: ConditionType.NFT_OWNERSHIP;
  contractType: NftContractType;
  contract: NetworkAddress;
  tokenIds?: TokenId[];
};

/**
 * @private
 */
export function refineNftOwnershipCondition(
  condition: NftOwnershipCondition,
  ctx: z.RefinementCtx,
) {
  if (condition.contractType === NftContractType.ERC1155) {
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
export const NftOwnershipConditionSchema = z.object({
  type: z.literal(ConditionType.NFT_OWNERSHIP),
  contract: NetworkAddressSchema,
  contractType: z.nativeEnum(NftContractType),
  tokenIds: TokenIdSchema.array()
    .min(1)
    .optional()
    .describe(
      'A list of token IDs you want to check ownership of. The list is optional for ERC721, ' +
        'you MUST provide a list of token IDs for ERC1155.',
    ),
});

export enum ConditionComparisonOperator {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
}

export type Erc20OwnershipCondition = {
  type: ConditionType.ERC20_OWNERSHIP;
  amount: Amount;
  condition: ConditionComparisonOperator;
};
/**
 * @internal
 */
export const Erc20OwnershipConditionSchema = z.object({
  type: z.literal(ConditionType.ERC20_OWNERSHIP),
  amount: AmountSchema,
  condition: z.nativeEnum(ConditionComparisonOperator),
});

export type EoaOwnershipCondition = {
  type: ConditionType.EOA_OWNERSHIP;
  address: EvmAddress;
};
/**
 * @internal
 */
export const EoaOwnershipConditionSchema = z.object({
  type: z.literal(ConditionType.EOA_OWNERSHIP),
  address: EvmAddressSchema,
});

export type ProfileOwnershipCondition = {
  type: ConditionType.PROFILE_OWNERSHIP;
  profileId: ProfileId;
};
/**
 * @internal
 */
export const ProfileOwnershipConditionSchema = z.object({
  type: z.literal(ConditionType.PROFILE_OWNERSHIP),
  profileId: ProfileIdSchema,
});

export type FollowCondition = {
  type: ConditionType.FOLLOW;
  follow: ProfileId;
};
/**
 * @internal
 */
export const FollowConditionSchema = z.object({
  type: z.literal(ConditionType.FOLLOW),
  follow: ProfileIdSchema,
});

export type CollectCondition = {
  type: ConditionType.COLLECT;
  publicationId: PublicationId;
  thisPublication: boolean;
};
/**
 * @internal
 */
export const CollectConditionSchema = z.object({
  type: z.literal(ConditionType.COLLECT),
  publicationId: PublicationIdSchema, // TODO check on-chain publication ID
  thisPublication: z.boolean().optional().default(false),
});

export type AdvancedContractCondition = {
  type: ConditionType.ADVANCED_CONTRACT;
  contract: NetworkAddress;
  functionName: string;
  abi: string;
  params: string[];
  comparison: ConditionComparisonOperator;
  value: string;
};

/**
 * @internal
 */
export const AdvancedContractConditionSchema = z.object({
  type: z.literal(ConditionType.ADVANCED_CONTRACT),
  contract: NetworkAddressSchema.describe('The contract address and chain id'),
  functionName: z.string().min(1).describe('The name of the function you want to call'),
  abi: z
    .string()
    .min(1)
    .describe(
      'The contract ABI. Has to be in human readable ' +
        'single string format containing the signature of the function you want to call. See ' +
        'https://docs.ethers.org/v5/api/utils/abi/formats/#abi-formats--human-readable-abi for more info',
    ),
  params: z
    .string()
    .array()
    .describe(
      'The parameters to pass to the function. Must be ' +
        'exactly matching the function arguments. You *must* pass in the `:userAddress` parameter to ' +
        'represent the decrypter address. Any array or tuple arguments, must be stringified JSON arrays.',
    ),
  comparison: z
    .nativeEnum(ConditionComparisonOperator)
    .describe(
      'The comparison operator to use. In case of boolean functions you can only use EQUAL or NOT_EQUAL',
    ),
  value: z
    .string()
    .regex(/^(true|false|\d{1,70})$/)
    .describe(`The comparison value. Accepts 'true', 'false' or a number`),
});

export type SimpleCondition =
  | CollectCondition
  | AdvancedContractCondition
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

export type AndCondition<T extends BaseCondition = SimpleCondition> = {
  type: ConditionType.AND;
  criteria: TwoAtLeastArray<T>;
};

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
      .max(5, 'Should have at most 5 conditions')
      .refine(hasTwoOrMore, 'Should have at least 2 conditions'),
  });
}

/**
 * @internal
 */
export const AndConditionSchema = andConditionSchema([
  NftOwnershipConditionSchema,
  Erc20OwnershipConditionSchema,
  EoaOwnershipConditionSchema,
  ProfileOwnershipConditionSchema,
  FollowConditionSchema,
  CollectConditionSchema,
  AdvancedContractConditionSchema,
]);

export type OrCondition<T extends BaseCondition = SimpleCondition> = {
  type: ConditionType.OR;
  criteria: TwoAtLeastArray<T>;
};

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
      .max(5, 'Should have at most 5 conditions')
      .refine(hasTwoOrMore, 'Should have at least 2 conditions'),
  });
}

/**
 * @internal
 */
export const OrConditionSchema = orConditionSchema([
  NftOwnershipConditionSchema,
  Erc20OwnershipConditionSchema,
  EoaOwnershipConditionSchema,
  ProfileOwnershipConditionSchema,
  FollowConditionSchema,
  CollectConditionSchema,
  AdvancedContractConditionSchema,
]);

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
  if (condition.type === ConditionType.NFT_OWNERSHIP) {
    refineNftOwnershipCondition(condition, ctx);
  }
}

export type AccessCondition = OrCondition<AnyCondition>;
/**
 * @internal
 */
export const AccessConditionSchema: z.ZodType<AccessCondition, z.ZodTypeDef, object> =
  orConditionSchema([
    AndConditionSchema,
    CollectConditionSchema,
    AdvancedContractConditionSchema,
    EoaOwnershipConditionSchema,
    Erc20OwnershipConditionSchema,
    FollowConditionSchema,
    NftOwnershipConditionSchema,
    OrConditionSchema,
    ProfileOwnershipConditionSchema,
  ]).superRefine((root, ctx): root is AccessCondition => {
    root.criteria.forEach((condition, idx) => {
      refineAnyCondition(condition, {
        ...ctx,
        path: [...ctx.path, 'criteria', idx],
      });
    });
    return z.NEVER;
  });

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
export const LitEncryptionKeySchema: z.Schema<LitEncryptionKey, z.ZodTypeDef, string> = z
  .string()
  .describe('A symmetric encryption key.')
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

export type LitEncryptionStrategy = {
  provider: EncryptionProvider;
  encryptionKey: LitEncryptionKey;
  accessCondition: AccessCondition;
  encryptedPaths: string[];
};
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

/**
 * The publication encryption strategy.
 *
 * This is normally populated by the Lens SDK so the vast majority of developers will not need to use this directly.
 */
export type PublicationEncryptionStrategy = LitEncryptionStrategy;

/**
 * @internal
 */
export const PublicationEncryptionStrategySchema: z.ZodType<
  PublicationEncryptionStrategy,
  z.ZodTypeDef,
  object
> = z.discriminatedUnion('provider', [LitEncryptionStrategySchema]);
