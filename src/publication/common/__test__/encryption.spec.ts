import { describe, it } from '@jest/globals';

import { expectSchema } from '../../../__helpers__/assertions.js';
import { mockNetworkAddress, mockProfileId } from '../../../__helpers__/mocks.js';
import {
  andCondition,
  followCondition,
  nftOwnershipCondition,
  orCondition,
  profileOwnershipCondition,
} from '../../../builders/index.js';
import { AccessConditionSchema, NftContractType } from '../index.js';

describe(`Given the encryption schemas`, () => {
  describe(`when parsing with AccessConditionSchema`, () => {
    it(`then it should complain about the missing properties`, () => {
      expectSchema(() => AccessConditionSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "type": Invalid literal value, expected "OR"
        · "criteria": Required"
      `);
    });

    it(`then it should flag ERC-1155 NftOwnershipCondition without token IDs`, () => {
      expectSchema(() =>
        AccessConditionSchema.safeParse(
          orCondition([
            profileOwnershipCondition({
              profileId: mockProfileId(),
            }),
            nftOwnershipCondition({
              contractType: NftContractType.ERC1155,
              contract: mockNetworkAddress(),
              // tokenIds: [] // omitted on purpose
            }),
          ]),
        ),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "criteria[1].tokenIds": ERC1155 requires at least one token id."
      `);
    });

    it(`then it should flag invalid nested ERC-1155 NftOwnershipCondition`, () => {
      expectSchema(() =>
        AccessConditionSchema.safeParse(
          orCondition([
            profileOwnershipCondition({
              profileId: mockProfileId(),
            }),
            andCondition([
              followCondition({
                follow: mockProfileId(),
              }),
              nftOwnershipCondition({
                contractType: NftContractType.ERC1155,
                contract: mockNetworkAddress(),
                // tokenIds: [] // omitted on purpose
              }),
            ]),
          ]),
        ),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "criteria[1].criteria[1].tokenIds": ERC1155 requires at least one token id."
      `);
    });
  });
});
