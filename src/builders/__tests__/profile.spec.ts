import { describe, expect, it } from '@jest/globals';

import { MetadataAttributeType } from '../../MetadataAttribute.js';
import { profile } from '../profile.js';

describe(`Given the "${profile.name}" metadata builder`, () => {
  describe(`when using it`, () => {
    it('should return a valid ProfileMetadata', () => {
      const metadata = profile({
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
            value: 'https://twitter.com/johndoe',
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
