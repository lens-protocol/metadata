import { evaluate } from './ValidationError';
import { NetworkAddressDetails, amount } from '../primitives';
import {
  AccessCondition,
  AccessConditionSchema,
  AndCondition,
  AndConditionSchema,
  AnyCondition,
  CollectCondition,
  CollectConditionSchema,
  ConditionComparisonOperator,
  ConditionType,
  EoaOwnershipCondition,
  EoaOwnershipConditionSchema,
  Erc20OwnershipCondition,
  Erc20OwnershipConditionSchema,
  FollowCondition,
  FollowConditionSchema,
  NftContractType,
  NftOwnershipCondition,
  NftOwnershipConditionSchema,
  OrCondition,
  OrConditionSchema,
  ProfileOwnershipCondition,
  ProfileOwnershipConditionSchema,
  SimpleCondition,
  refineNftOwnershipCondition,
} from '../publication';

export type CollectConditionDetails = {
  /**
   * The Publication Id that needs to be collected to fulfill the condition.
   */
  publicationId: string;
  /**
   * If the Publication Id refers to the current publication.
   */
  thisPublication: boolean;
};
/**
 * Creates a Collect condition.
 *
 * @category Helpers
 */
export function collectCondition(input: CollectConditionDetails): CollectCondition {
  return evaluate(
    CollectConditionSchema.safeParse({
      type: ConditionType.COLLECT,
      ...input,
    }),
  );
}

export type EoaOwnershipConditionDetails = {
  /**
   * The EVM address to verify ownership of.
   */
  address: string;
};
/**
 * Creates an EOA ownership condition.
 *
 * @category Helpers
 */
export function eoaOwnershipCondition(input: EoaOwnershipConditionDetails): EoaOwnershipCondition {
  return evaluate(
    EoaOwnershipConditionSchema.safeParse({
      type: ConditionType.EOA_OWNERSHIP,
      ...input,
    }),
  );
}

export type Erc20OwnershipConditionDetails = {
  /**
   * The comparison operator to use to compare the ERC-20 token balance.
   */
  condition: ConditionComparisonOperator;
  /**
   * The ERC-20 token contract address details.
   */
  contract: NetworkAddressDetails;
  /**
   * The ERC-20 token decimals (e.g. 18 for GHO)
   */
  decimals: number;
  /**
   * The human readable amount to compare the ERC-20 token balance against using the comparison operator.
   *
   * @example
   * 1.5
   * 42
   * 0.000002
   */
  value: string;
};

/**
 * Creates an ERC-20 token ownership condition.
 *
 * @category Helpers
 * @param input - The ERC-20 token ownership condition details.
 */
export function erc20OwnershipCondition({
  condition,
  ...others
}: Erc20OwnershipConditionDetails): Erc20OwnershipCondition {
  return evaluate(
    Erc20OwnershipConditionSchema.safeParse({
      type: ConditionType.ERC20_OWNERSHIP,
      amount: amount(others),
      condition,
    }),
  );
}

export type Erc721OwnershipConditionDetails = {
  /**
   * The NFT contract address details.
   */
  contract: NetworkAddressDetails;
  /**
   * The list of token ids to verify ownership of.
   */
  tokenIds?: string[];
};

/**
 * Creates an ERC-721 NFT ownership condition.
 *
 * @category Helpers
 */
export function erc721OwnershipCondition(
  input: Erc721OwnershipConditionDetails,
): NftOwnershipCondition {
  return evaluate(
    NftOwnershipConditionSchema.superRefine(refineNftOwnershipCondition).safeParse({
      type: ConditionType.NFT_OWNERSHIP,
      contractType: NftContractType.ERC721,
      ...input,
    }),
  );
}

export type Erc1155OwnershipConditionDetails = {
  /**
   * The NFT contract address details.
   */
  contract: NetworkAddressDetails;
  /**
   * The list of token ids to verify ownership of.
   */
  tokenIds: string[];
};

/**
 * Creates an ERC-1155 NFT ownership condition.
 *
 * @category Helpers
 */
export function erc1155OwnershipCondition(
  input: Erc721OwnershipConditionDetails,
): NftOwnershipCondition {
  return evaluate(
    NftOwnershipConditionSchema.superRefine(refineNftOwnershipCondition).safeParse({
      type: ConditionType.NFT_OWNERSHIP,
      contractType: NftContractType.ERC1155,
      ...input,
    }),
  );
}

export type ProfileOwnershipConditionDetails = {
  profileId: string;
};
/**
 * Creates a Lens Profile ownership condition.
 *
 * @category Helpers
 */
export function profileOwnershipCondition(
  input: ProfileOwnershipConditionDetails,
): ProfileOwnershipCondition {
  return evaluate(
    ProfileOwnershipConditionSchema.safeParse({
      type: ConditionType.PROFILE_OWNERSHIP,
      ...input,
    }),
  );
}

export type FollowConditionDetails = {
  follow: string;
};
/**
 * Creates a follow Lens Profile condition.
 *
 * @category Helpers
 */
export function followCondition(input: FollowConditionDetails): FollowCondition {
  return evaluate(
    FollowConditionSchema.safeParse({
      type: ConditionType.FOLLOW,
      ...input,
    }),
  );
}

/**
 * Creates an AND condition between two or more conditions.
 *
 * @category Helpers
 */
export function andCondition<T extends SimpleCondition[]>(criteria: T): AndCondition<T[number]> {
  return evaluate(
    AndConditionSchema.safeParse({
      type: ConditionType.AND,
      criteria,
    }),
  );
}

/**
 * Creates an OR condition between two or more conditions.
 *
 * @category Helpers
 */
export function orCondition<T extends SimpleCondition[]>(criteria: T): OrCondition<T[number]> {
  return evaluate(
    OrConditionSchema.safeParse({
      type: ConditionType.OR,
      criteria,
    }),
  );
}

/**
 * Creates the access condition specification for a given publication.
 *
 * @internal
 */
export function accessCondition(criteria: AnyCondition[]): AccessCondition {
  return evaluate(
    AccessConditionSchema.safeParse({
      type: ConditionType.OR,
      criteria,
    }),
  );
}
