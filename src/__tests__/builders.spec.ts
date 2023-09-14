import { describe, expect, it } from '@jest/globals';

import { ValidationError, article, textOnly } from '../builders.js';

describe(`Given the publication metadata builders`, () => {
  describe(`when using the ${article.name} builder`, () => {
    it('should return a valid TextOnlyMetadata', () => {
      const metadata = article({ content: 'GM!' });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });

    it(`should throw a "${ValidationError.name}" in case of invalid input`, () => {
      expect(() => article({ content: '' })).toThrowError(ValidationError);
    });
  });

  describe(`when using the ${textOnly.name} builder`, () => {
    it('should return a valid TextOnlyMetadata', () => {
      const metadata = textOnly({ content: 'GM!' });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });
});
