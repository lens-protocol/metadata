import { describe, it } from '@jest/globals';

import { expectResult } from '../../__helpers__/assertions.js';
import { ProfileMetadataSchema } from '../ProfileMetadataSchema.js';

describe(`Given the ProfileMetadataSchema`, () => {
  describe(`when parsing an invalid object`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        ProfileMetadataSchema.safeParse({
          $schema: 'https://json-schemas.lens.dev/profile/2.0.0.json',
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
        · "lens.id": Required
        · "lens.name": Expected string, received number
        · "lens.bio": Expected string, received boolean
        · "lens.picture": Should be a valid URI
        · "lens.coverPicture": Should be a valid URI
        · "lens.attributes": Expected array, received object"
      `);
    });
  });
});
