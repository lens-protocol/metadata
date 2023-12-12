import { describe, expect, it } from '@jest/globals';

import { ConditionComparisonOperator } from '../../publication/index.js';
import { ValidationError } from '../ValidationError.js';
import {
  andCondition,
  followCondition,
  erc721OwnershipCondition,
  erc1155OwnershipCondition,
  orCondition,
  profileOwnershipCondition,
  Erc1155OwnershipConditionDetails,
  collectCondition,
  eoaOwnershipCondition,
  erc20OwnershipCondition,
  accessCondition,
} from '../encryption.js';

describe(`Given the encryption access condition helpers`, () => {
  describe(`when using the "${collectCondition.name}" helper`, () => {
    it('should return a valid CollectCondition', () => {
      const condition = collectCondition({ publicationId: '0x01-0x01', thisPublication: false });

      expect(condition).toMatchInlineSnapshot(`
        {
          "publicationId": "0x01-0x01",
          "thisPublication": false,
          "type": "COLLECT",
        }
      `);
    });
  });

  describe(`when using the "${eoaOwnershipCondition.name}" helper`, () => {
    it('should return a valid EoaOwnershipCondition', () => {
      const condition = eoaOwnershipCondition({
        address: '0x1234567890123456789012345678901234567890',
      });

      expect(condition).toMatchInlineSnapshot(`
        {
          "address": "0x1234567890123456789012345678901234567890",
          "type": "EOA_OWNERSHIP",
        }
      `);
    });
  });

  describe(`when using the "${erc20OwnershipCondition.name}" helper`, () => {
    it('should return a valid Erc20OwnershipCondition', () => {
      const condition = erc20OwnershipCondition({
        contract: {
          address: '0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f',
          chainId: 1,
        },
        decimals: 18,
        value: '42',
        condition: ConditionComparisonOperator.EQUAL,
      });

      expect(condition).toMatchInlineSnapshot(`
        {
          "amount": {
            "asset": {
              "contract": {
                "address": "0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f",
                "chainId": 1,
              },
              "decimals": 18,
            },
            "value": "42",
          },
          "condition": "EQUAL",
          "type": "ERC20_OWNERSHIP",
        }
      `);
    });
  });

  describe(`when using the "${followCondition.name}" helper`, () => {
    it('should return a valid FollowCondition', () => {
      const condition = followCondition({ follow: '0x01' });

      expect(condition).toMatchInlineSnapshot(`
        {
          "follow": "0x01",
          "type": "FOLLOW",
        }
      `);
    });
  });

  describe(`when using the "${profileOwnershipCondition.name}" helper`, () => {
    it('should return a valid ProfileOwnershipCondition', () => {
      const condition = profileOwnershipCondition({ profileId: '0x01' });

      expect(condition).toMatchInlineSnapshot(`
        {
          "profileId": "0x01",
          "type": "PROFILE_OWNERSHIP",
        }
      `);
    });
  });

  describe(`when using the "${erc721OwnershipCondition.name}" helper`, () => {
    it('should return a valid NftOwnershipCondition', () => {
      const condition = erc721OwnershipCondition({
        contract: {
          address: '0x1234567890123456789012345678901234567890',
          chainId: 1,
        },
        tokenIds: ['0x02'],
      });

      expect(condition).toMatchInlineSnapshot(`
        {
          "contract": {
            "address": "0x1234567890123456789012345678901234567890",
            "chainId": 1,
          },
          "contractType": "ERC721",
          "tokenIds": [
            "0x02",
          ],
          "type": "NFT_OWNERSHIP",
        }
      `);
    });
    it(`should support empty "tokenIds"`, () => {
      const condition = erc721OwnershipCondition({
        contract: {
          address: '0x1234567890123456789012345678901234567890',
          chainId: 1,
        },
      });

      expect(condition).toMatchInlineSnapshot(`
        {
          "contract": {
            "address": "0x1234567890123456789012345678901234567890",
            "chainId": 1,
          },
          "contractType": "ERC721",
          "type": "NFT_OWNERSHIP",
        }
      `);
    });
  });

  describe(`when using the "${erc1155OwnershipCondition.name}" helper`, () => {
    it('should return a valid NftOwnershipCondition', () => {
      const condition = erc1155OwnershipCondition({
        contract: {
          address: '0x1234567890123456789012345678901234567890',
          chainId: 1,
        },
        tokenIds: ['0x02'],
      });

      expect(condition).toMatchInlineSnapshot(`
        {
          "contract": {
            "address": "0x1234567890123456789012345678901234567890",
            "chainId": 1,
          },
          "contractType": "ERC1155",
          "tokenIds": [
            "0x02",
          ],
          "type": "NFT_OWNERSHIP",
        }
      `);
    });

    it(`should throw a ${ValidationError.name} in case of ERC-1155 without "tokenIds"`, () => {
      expect(() =>
        erc1155OwnershipCondition({
          contract: {
            address: '0x1234567890123456789012345678901234567890',
            chainId: 1,
          },
        } as Erc1155OwnershipConditionDetails),
      ).toThrowError(ValidationError);
    });
  });

  describe(`when using the "${orCondition.name}" helper`, () => {
    it('should return a valid OrCondition', () => {
      const condition = orCondition([
        profileOwnershipCondition({ profileId: '0x01' }),
        profileOwnershipCondition({ profileId: '0x02' }),
      ]);

      expect(condition).toMatchInlineSnapshot(`
        {
          "criteria": [
            {
              "profileId": "0x01",
              "type": "PROFILE_OWNERSHIP",
            },
            {
              "profileId": "0x02",
              "type": "PROFILE_OWNERSHIP",
            },
          ],
          "type": "OR",
        }
      `);
    });

    it('should reject in case of too not enough conditions', () => {
      expect(() => orCondition([profileOwnershipCondition({ profileId: '0x01' })])).toThrowError(
        'Should have at least 2 conditions',
      );
    });

    it('should reject in case of too many conditions', () => {
      expect(() =>
        orCondition([
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
        ]),
      ).toThrowError('Should have at most 5 conditions');
    });
  });

  describe(`when using the "${andCondition.name}" helper`, () => {
    it('should return a valid AndCondition', () => {
      const condition = orCondition([
        profileOwnershipCondition({ profileId: '0x01' }),
        followCondition({ follow: '0x02' }),
      ]);

      expect(condition).toMatchInlineSnapshot(`
        {
          "criteria": [
            {
              "profileId": "0x01",
              "type": "PROFILE_OWNERSHIP",
            },
            {
              "follow": "0x02",
              "type": "FOLLOW",
            },
          ],
          "type": "OR",
        }
      `);
    });

    it('should reject in case of too not enough conditions', () => {
      expect(() => andCondition([profileOwnershipCondition({ profileId: '0x01' })])).toThrowError(
        'Should have at least 2 conditions',
      );
    });

    it('should reject in case of too many conditions', () => {
      expect(() =>
        andCondition([
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
          profileOwnershipCondition({ profileId: '0x01' }),
        ]),
      ).toThrowError('Should have at most 5 conditions');
    });
  });

  describe(`when using the "${accessCondition.name}" helper`, () => {
    it('should return a valid AccessCondition', () => {
      const condition = accessCondition([
        profileOwnershipCondition({ profileId: '0x01' }),
        andCondition([
          followCondition({ follow: '0x02' }),
          collectCondition({ publicationId: '0x01-0x03', thisPublication: false }),
        ]),
      ]);

      expect(condition).toMatchInlineSnapshot(`
        {
          "criteria": [
            {
              "profileId": "0x01",
              "type": "PROFILE_OWNERSHIP",
            },
            {
              "criteria": [
                {
                  "follow": "0x02",
                  "type": "FOLLOW",
                },
                {
                  "publicationId": "0x01-0x03",
                  "thisPublication": false,
                  "type": "COLLECT",
                },
              ],
              "type": "AND",
            },
          ],
          "type": "OR",
        }
      `);
    });
  });
});
