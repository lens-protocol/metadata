import { describe, expect, it } from 'vitest';

import { expectResult } from '../../__helpers__/assertions.js';
import { ProfileMetadataSchema } from '../index.js';

describe('Given the ProfileMetadataSchema', () => {
  describe('when parsing an invalid object', () => {
    it('then it should default missing fields', () => {
      expectResult(() => ProfileMetadataSchema.safeParse({})).toMatchSnapshot({
        metadata_id: expect.any(String),
      });
    });

    it('then it should handle attributes in a backwards compatible way', () => {
      expectResult(() =>
        ProfileMetadataSchema.safeParse({
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

  describe('when performing regression testing', () => {
    it('then it should support optional `bio` and `description`', () => {
      expectResult(() =>
        ProfileMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: 'b817be7a-3ecf-4fc9-a983-7a04654d2911',
          description: 'test',
          content: 'test',
          external_url: null,
          image: null,
          imageMimeType: null,
          name: 'Post by @niooo1.test',
          attributes: [{ traitType: 'string', key: 'type', value: 'post' }],
          media: [],
          appId: 'Lenster',
        }),
      ).toMatchInlineSnapshot(`
        {
          "appId": "Lenster",
          "attributes": [
            {
              "key": "type",
              "traitType": "string",
              "value": "post",
            },
          ],
          "content": "test",
          "description": "test",
          "external_url": null,
          "image": null,
          "imageMimeType": null,
          "media": [],
          "metadata_id": "b817be7a-3ecf-4fc9-a983-7a04654d2911",
          "name": "Post by @niooo1.test",
          "version": "1.0.0",
        }
      `);
    });
  });
});
