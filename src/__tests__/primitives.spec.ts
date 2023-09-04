import { describe, it } from '@jest/globals';

import { expectSchema } from '../__helpers__/assertions.js';
import { datetimeSchema } from '../primitives.js';

describe(`Given the primitives schemas`, () => {
  describe(`when parsing a datetime value`, () => {
    it(`then should support ISO 8601 UTC datetime strings`, () => {
      expectSchema(() =>
        datetimeSchema('not used').safeParse('2023-05-16T18:43:35Z'),
      ).toMatchInlineSnapshot(`"2023-05-16T18:43:35Z"`);
    });
  });
});
