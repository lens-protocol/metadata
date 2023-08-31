import { describe, it } from '@jest/globals';

import { expectSchema } from '../../__helpers__/assertions.js';
import { PublicationMetadataSchema, PublicationSchemaId } from '../index.js';

describe(`Given the PublicationMetadataSchema`, () => {
  describe(`when parsing an empty object`, () => {
    it(`then it should complain about the missing $schema`, () => {
      expectSchema(() => PublicationMetadataSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "$schema": Invalid discriminator value. Expected 'https://json-schemas.lens.dev/publications/article/1.0.0.json' | 'https://json-schemas.lens.dev/publications/audio/1.0.0.json' | 'https://json-schemas.lens.dev/publications/checking-in/1.0.0.json' | 'https://json-schemas.lens.dev/publications/embed/1.0.0.json' | 'https://json-schemas.lens.dev/publications/event/1.0.0.json' | 'https://json-schemas.lens.dev/publications/image/1.0.0.json' | 'https://json-schemas.lens.dev/publications/link/1.0.0.json' | 'https://json-schemas.lens.dev/publications/livestream/1.0.0.json' | 'https://json-schemas.lens.dev/publications/mint/1.0.0.json' | 'https://json-schemas.lens.dev/publications/space/1.0.0.json' | 'https://json-schemas.lens.dev/publications/text-only/1-0-0.json' | 'https://json-schemas.lens.dev/publications/story/1.0.0.json' | 'https://json-schemas.lens.dev/publications/transaction/1.0.0.json' | 'https://json-schemas.lens.dev/publications/3d/1.0.0.json' | 'https://json-schemas.lens.dev/publications/video/1-0-0.json'"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.ARTICLE_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.ARTICLE_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.content": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "ARTICLE""
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.AUDIO_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.AUDIO_LATEST,
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

  describe(`when parsing an invalid ${PublicationSchemaId.CHECKING_IN_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.CHECKING_IN_LATEST,
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

  describe(`when parsing an invalid ${PublicationSchemaId.EMBED_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.EMBED_LATEST,
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

  describe(`when parsing an invalid ${PublicationSchemaId.IMAGE_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.IMAGE_LATEST,
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

  describe(`when parsing an invalid ${PublicationSchemaId.LINK_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.LINK_LATEST,
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

  describe(`when parsing an invalid ${PublicationSchemaId.LIVESTREAM_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.LIVESTREAM_LATEST,
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

  describe(`when parsing an invalid ${PublicationSchemaId.MINT_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.MINT_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "MINT"
        · "lens.mintLink": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.SPACE_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.SPACE_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "SPACE"
        · "lens.link": Required
        · "lens.startsAt": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.STORY_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.STORY_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "STORY""
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.TEXT_ONLY_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.TEXT_ONLY_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.content": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "TEXT_ONLY""
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.THREE_D_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.THREE_D_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "3D"
        · "lens.threeDAssets": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.TRANSACTION_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.TRANSACTION_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus": Invalid literal value, expected "TRANSACTION"
        · "lens.txHash": Required
        · "lens.chainId": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.VIDEO_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.VIDEO_LATEST,
          lens: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.locale": Required
        · "lens.mainContentFocus" expected to match one of the following groups:
        		· "lens.mainContentFocus": Invalid literal value, expected "SHORT_VIDEO"
        	OR:
        		· "lens.mainContentFocus": Invalid literal value, expected "VIDEO"
        · "lens.video": Required"
      `);
    });
  });
});
