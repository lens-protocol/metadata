import { describe, expect, it } from 'vitest';

import { action } from '../action.js';

describe(`Given the "${action.name}" metadata builder`, () => {
  describe('when using it', () => {
    it('should return a valid AccountMetadata', () => {
      const metadata = action({
        name: 'My Open Action',
        title: 'This is my Open Action',
        description: 'Get ready for the future of social interaction!',
        authors: ['awesome-dev@lens.xyz'],
        source: 'https://github.com/foobarbaz/my-open-action',
        configureParams: [
          {
            key: '0xc8a06abcb0f2366f32dc2741bdf075c3215e3108918311ec0ac742f1ffd37f49',
            name: 'account',
            type: 'address',
          },
          {
            key: '0xc8a06abcb0f2366f32dc2741bdf075c3215e3108918311ec0ac742f1ffd37f49',
            name: 'recipients',
            type: 'address[]',
          },
        ],
        executeParams: [
          {
            key: '0xc8a06abcb0f2366f32dc2741bdf075c3215e3108918311ec0ac742f1ffd37f49',
            name: 'amount',
            type: 'uint256',
          },
          {
            key: '0xc8a06abcb0f2366f32dc2741bdf075c3215e3108918311ec0ac742f1ffd37f49',
            name: 'recipients',
            type: '(address, uint256)[]',
          },
        ],
        setDisabledParams: [
          {
            key: '0xc8a06abcb0f2366f32dc2741bdf075c3215e3108918311ec0ac742f1ffd37f49',
            name: 'amount',
            type: 'uint256',
          },
          {
            key: '0xc8a06abcb0f2366f32dc2741bdf075c3215e3108918311ec0ac742f1ffd37f49',
            name: 'recipients',
            type: '(address, uint256)[]',
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
