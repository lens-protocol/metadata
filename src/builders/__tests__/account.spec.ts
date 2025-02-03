import { describe, expect, it } from 'vitest';

import { MetadataAttributeType } from '../../MetadataAttribute.js';
import { account } from '../account.js';

describe(`Given the "${account.name}" metadata builder`, () => {
  describe('when using it', () => {
    it('should return a valid AccountMetadata', () => {
      const metadata = account({
        name: 'John Doe',
        bio: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.

        - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        - Donec a diam lectus.
        `,
        picture: 'https://example.com/picture.png',
        coverPicture: 'https://example.com/cover.png',
        attributes: [
          {
            key: 'twitter',
            type: MetadataAttributeType.STRING,
            value: 'https://x.com/johndoe',
          },
          {
            key: 'dob',
            type: MetadataAttributeType.DATE,
            value: '1990-01-01T00:00:00Z',
          },
          {
            key: 'enabled',
            type: MetadataAttributeType.BOOLEAN,
            value: 'true',
          },
          {
            key: 'height',
            type: MetadataAttributeType.NUMBER,
            value: '1.8',
          },
          {
            key: 'settings',
            type: MetadataAttributeType.JSON,
            value: '{"theme": "dark"}',
          },
        ],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });
});
