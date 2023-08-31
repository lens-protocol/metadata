import { describe, it } from '@jest/globals';

import { expectSchema } from '../__helpers__/assertions.js';
import { legacy } from '../index.js';

describe(`Given the legacy.ProfileMetadataSchema`, () => {
  describe(`when parsing an invalid object`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() => legacy.ProfileMetadataSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "version": Invalid literal value, expected "1.0.0"
        · "metadata_id": Required
        · "name": Required
        · "bio": Required
        · "cover_picture": Required
        · "attributes": Required"
      `);
    });

    it(`then it should handle attributes in a backwards compatible way`, () => {
      expectSchema(() =>
        legacy.ProfileMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: 'foo',

          name: null,
          bio: null,
          cover_picture: null,

          attributes: [
            {
              key: 'something',
            },
            {
              value: 'something',
            },
            {
              key: null,
              value: null,
            },
            {
              key: 42,
              value: true,
            },
            {
              key: {
                baz: true,
              },
              value: {
                foo: 'bar',
              },
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        {
          "attributes": [
            {
              "key": "something",
              "value": "",
            },
            {
              "key": "",
              "value": "something",
            },
            {
              "key": "",
              "value": "",
            },
            {
              "key": "42",
              "value": "true",
            },
            {
              "key": "{"baz":true}",
              "value": "{"foo":"bar"}",
            },
          ],
          "bio": null,
          "cover_picture": null,
          "metadata_id": "foo",
          "name": null,
          "version": "1.0.0",
        }
      `);
    });
  });
});
