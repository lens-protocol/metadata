import { describe, it } from '@jest/globals';

import { expectSchema } from '../../__helpers__/assertions.js';
import { ProfileMetadataSchema } from '../ProfileMetadataSchema.js';

describe(`Given the ProfileMetadataSchema`, () => {
  describe(`when parsing an invalid object`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        ProfileMetadataSchema.safeParse({
          $schema: 'https://json-schemas.lens.dev/profile/1.0.0.json',
          lens: {
            name: 42,

            bio: true,

            picture: '¯_(ツ)_/¯',

            coverPicture: '¯_(ツ)_/¯',

            attributes: {
              foo: 42,
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.name": Expected string, received number
        · "lens.bio": Expected string, received boolean
        · "lens.picture": Invalid url
        · "lens.coverPicture": Invalid url
        · "lens.attributes": Expected array, received object"
      `);
    });
  });
});