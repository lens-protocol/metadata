import { describe, it } from '@jest/globals';

import { expectResult } from '../../../__helpers__/assertions.js';
import { mockNetworkAddress, mockProfileId } from '../../../__helpers__/mocks.js';
import { followCondition, profileOwnershipCondition } from '../../../builders/index.js';
import { AccessConditionSchema, ConditionType, NftContractType } from '../index.js';

describe(`Given the encryption schemas`, () => {
  describe(`when parsing with AccessConditionSchema`, () => {
    it(`then it should complain about the missing properties`, () => {
      expectResult(() => AccessConditionSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "type": Invalid literal value, expected "OR"
        · "criteria": Required"
      `);
    });

    it(`then it should flag ERC-1155 NftOwnershipCondition without token IDs`, () => {
      expectResult(() =>
        AccessConditionSchema.safeParse({
          type: ConditionType.OR,
          criteria: [
            profileOwnershipCondition({
              profileId: mockProfileId(),
            }),
            {
              type: ConditionType.NFT_OWNERSHIP,
              contractType: NftContractType.ERC1155,
              contract: mockNetworkAddress(),
              // tokenIds: [] // omitted on purpose
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "criteria[1].tokenIds": ERC1155 requires at least one token id."
      `);
    });

    it(`then it should flag invalid nested ERC-1155 NftOwnershipCondition`, () => {
      expectResult(() =>
        AccessConditionSchema.safeParse({
          type: ConditionType.OR,
          criteria: [
            profileOwnershipCondition({
              profileId: mockProfileId(),
            }),
            {
              type: ConditionType.AND,
              criteria: [
                followCondition({
                  follow: mockProfileId(),
                }),
                {
                  type: ConditionType.NFT_OWNERSHIP,
                  contractType: NftContractType.ERC1155,
                  contract: mockNetworkAddress(),
                  // tokenIds: [] // omitted on purpose
                },
              ],
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "criteria[1].criteria[1].tokenIds": ERC1155 requires at least one token id."
      `);
    });
  });
});
