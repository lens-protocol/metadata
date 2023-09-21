import {
  AndCondition,
  ConditionType,
  FollowCondition,
  FollowConditionSchema,
  NftOwnershipCondition,
  NftOwnershipConditionSchema,
  OrCondition,
  ProfileOwnershipCondition,
  ProfileOwnershipConditionSchema,
} from '../publication';
import { Prettify, assertHasTwoOrMore } from '../utils';

/**
 * Creates a NFT ownership condition.
 *
 * @category Helpers
 */
export function nftOwnershipCondition(
  input: Prettify<Omit<NftOwnershipCondition, 'type'>>,
): NftOwnershipCondition {
  return NftOwnershipConditionSchema.parse({
    type: ConditionType.NFT_OWNERSHIP,
    ...input,
  });
}

/**
 * Creates a Lens Profile ownership condition.
 *
 * @category Helpers
 */
export function profileOwnershipCondition(
  input: Prettify<Omit<ProfileOwnershipCondition, 'type'>>,
): ProfileOwnershipCondition {
  return ProfileOwnershipConditionSchema.parse({
    type: ConditionType.PROFILE_OWNERSHIP,
    ...input,
  });
}

/**
 * Creates a follow Lens Profile condition.
 *
 * @category Helpers
 */
export function followCondition(input: Prettify<Omit<FollowCondition, 'type'>>): FollowCondition {
  return FollowConditionSchema.parse({
    type: ConditionType.FOLLOW,
    ...input,
  });
}

/**
 * Creates an AND condition between two or more conditions.
 *
 * @category Helpers
 */
export function andCondition<T>(options: T[]): AndCondition<T> {
  assertHasTwoOrMore(options);
  return {
    type: ConditionType.AND,
    criteria: options,
  };
}
/**
 * Creates an OR condition between two or more conditions.
 *
 * @category Helpers
 */
export function orCondition<T>(options: T[]): OrCondition<T> {
  assertHasTwoOrMore(options);
  return {
    type: ConditionType.OR,
    criteria: options,
  };
}
