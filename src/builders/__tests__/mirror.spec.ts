import { describe, expect, it } from '@jest/globals';

import { mirror } from '../mirror.js';

describe(`Given the "${mirror.name}" metadata builder`, () => {
  describe(`when using it`, () => {
    it('should return a valid MirrorMetadata', () => {
      const metadata = mirror({
        appId: 'com.example.app',
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });
});
