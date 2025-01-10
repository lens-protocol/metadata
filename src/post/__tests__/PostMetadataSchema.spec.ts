import { describe, it } from 'vitest';

import { expectResult } from '../../__helpers__/assertions.js';
import { PostMetadataSchema, PostSchemaId } from '../index.js';

describe('Given the PostMetadataSchema', () => {
  describe('when parsing an empty object', () => {
    it('then it should complain about the missing $schema', () => {
      expectResult(() => PostMetadataSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "$schema": Invalid discriminator value. Expected 'https://json-schemas.lens.dev/posts/article/3.0.0.json' | 'https://json-schemas.lens.dev/posts/audio/3.0.0.json' | 'https://json-schemas.lens.dev/posts/checking-in/3.0.0.json' | 'https://json-schemas.lens.dev/posts/embed/3.0.0.json' | 'https://json-schemas.lens.dev/posts/event/3.0.0.json' | 'https://json-schemas.lens.dev/posts/image/3.0.0.json' | 'https://json-schemas.lens.dev/posts/link/3.0.0.json' | 'https://json-schemas.lens.dev/posts/livestream/3.0.0.json' | 'https://json-schemas.lens.dev/posts/mint/3.0.0.json' | 'https://json-schemas.lens.dev/posts/space/3.0.0.json' | 'https://json-schemas.lens.dev/posts/text-only/3.0.0.json' | 'https://json-schemas.lens.dev/posts/story/3.0.0.json' | 'https://json-schemas.lens.dev/posts/transaction/3.0.0.json' | 'https://json-schemas.lens.dev/posts/3d/3.0.0.json' | 'https://json-schemas.lens.dev/posts/video/3.0.0.json'"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.ARTICLE_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.ARTICLE_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "ARTICLE"
        · "lens.content": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.AUDIO_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.AUDIO_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "AUDIO"
        · "lens.audio": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.CHECKING_IN_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.CHECKING_IN_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "CHECKING_IN"
        · "lens.location": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.EMBED_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.EMBED_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "EMBED"
        · "lens.embed": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.IMAGE_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.IMAGE_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "IMAGE"
        · "lens.image": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.LINK_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.LINK_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "LINK"
        · "lens.sharingLink": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.LIVESTREAM_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.LIVESTREAM_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "LIVESTREAM"
        · "lens.startsAt": Required
        · "lens.playbackUrl": Required
        · "lens.liveUrl": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.MINT_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.MINT_LATEST,
          lens: {
            mintLink: ' ',
          },
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "MINT"
        · "lens.mintLink": String must contain at least 6 character(s)
        · "lens.mintLink": Should be a valid URI"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.SPACE_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.SPACE_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "SPACE"
        · "lens.title": Required
        · "lens.link": Required
        · "lens.startsAt": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.STORY_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.STORY_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "STORY"
        · "lens.asset": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.TEXT_ONLY_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.TEXT_ONLY_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "TEXT_ONLY"
        · "lens.content": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.THREE_D_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.THREE_D_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "3D"
        · "lens.assets": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.TRANSACTION_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.TRANSACTION_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "TRANSACTION"
        · "lens.txHash": Required
        · "lens.type": Required
        · "lens.chainId": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PostSchemaId.VIDEO_LATEST}`, () => {
    it('then it should flag the missing fields', () => {
      expectResult(() =>
        PostMetadataSchema.safeParse({
          $schema: PostSchemaId.VIDEO_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": expected to match one of the following groups:
        		"lens.mainContentFocus": Invalid literal value, expected "SHORT_VIDEO"
        	OR:
        		"lens.mainContentFocus": Invalid literal value, expected "VIDEO"
        · "lens.video": Required"
      `);
    });
  });
});
