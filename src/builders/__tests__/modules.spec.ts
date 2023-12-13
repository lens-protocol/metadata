import { describe, expect, it } from '@jest/globals';

import { MetadataAttributeType } from '../../MetadataAttribute.js';
import { module } from '../modules.js';

describe(`Given the "${module.name}" metadata builder`, () => {
  describe(`when using it`, () => {
    it('should return a valid OpenActionMetadata', () => {
      const metadata = module({
        name: 'Open Action Name',
        title: 'Open Action Title',
        authors: ['me@lens.xyz'],
        attributes: [
          {
            key: 'twitter',
            type: MetadataAttributeType.STRING,
            value: 'https://twitter.com/johndoe',
          },
          {
            key: 'dob',
            type: MetadataAttributeType.STRING,
            value: '1990-01-01T00:00:00Z',
          },
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.

        - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        - Donec a diam lectus.
        `,
        initializeCalldataABI: JSON.stringify([
          {
            type: 'address',
            name: 'address',
            indexed: true,
          },
          {
            type: 'uint256',
            name: 'price',
            indexed: true,
          },
        ]),
        processCalldataABI: JSON.stringify([
          {
            type: 'address',
            name: 'collector',
            indexed: true,
          },
        ]),
      });

      expect(metadata).toMatchSnapshot();
    });
  });
});
