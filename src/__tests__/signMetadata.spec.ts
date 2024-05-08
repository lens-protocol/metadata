import { describe, expect, it } from '@jest/globals';
import { Wallet } from 'ethers';

const signer = new Wallet('0xd6e6257e8cf0f321ad0f798dd0b121a7eb4fe9c7c51994e843c0a1ed05867a5f');

import { MetadataAttributeType } from '../MetadataAttribute';
import { textOnly } from '../builders';
import { signMetadata } from '../signMetadata.js';

describe(`Given the ${signMetadata.name} function`, () => {
  describe('when called on PublicationMetadata', () => {
    it('should return signed metadata with simple flat metadata', async () => {
      const metadata = textOnly({
        content: 'Hello, world!',
        id: '42',
        attributes: [
          {
            key: 'string',
            value: 'value',
            type: MetadataAttributeType.STRING,
          },
          {
            key: 'boolean',
            value: 'true',
            type: MetadataAttributeType.BOOLEAN,
          },
        ],
      });

      const signed = await signMetadata(metadata, (message) => signer.signMessage(message));

      expect(signed).toHaveProperty(
        'signature',
        '0x28e8944e5ec1ab1cce78ead972262af4e2e0148d7f8eabf36ff03ff827021b685c3858b8e34caef13a932fb992a856a41f9f0a9107d3440dbca52ec4101aca761b',
      );
    });
  });
});
