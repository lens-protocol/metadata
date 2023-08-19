import { describe, it } from '@jest/globals';

import { expectSchema } from '../../__helpers__/assertions.js';
import { PublicationMainFocus, PublicationMetadataSchema, PublicationSchemaId } from '../index.js';

describe(`Given the PublicationMetadataSchema`, () => {
  describe(`when parsing an empty object`, () => {
    it(`then should complain about the missing $schema`, () => {
      expectSchema(() => PublicationMetadataSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "$schema": Invalid discriminator value. Expected 'https://json-schemas.lens.dev/publications/article/1.0.0.json' | 'https://json-schemas.lens.dev/publications/audio/1.0.0.json' | 'https://json-schemas.lens.dev/publications/checking-in/1.0.0.json' | 'https://json-schemas.lens.dev/publications/embed/1.0.0.json' | 'https://json-schemas.lens.dev/publications/event/1.0.0.json' | 'https://json-schemas.lens.dev/publications/image/1.0.0.json' | 'https://json-schemas.lens.dev/publications/link/1.0.0.json' | 'https://json-schemas.lens.dev/publications/livestream/1.0.0.json' | 'https://json-schemas.lens.dev/publications/mint/1.0.0.json' | 'https://json-schemas.lens.dev/publications/space/1.0.0.json' | 'https://json-schemas.lens.dev/publications/text-only/1-0-0.json' | 'https://json-schemas.lens.dev/publications/story/1.0.0.json' | 'https://json-schemas.lens.dev/publications/transaction/1.0.0.json' | 'https://json-schemas.lens.dev/publications/3d/1.0.0.json' | 'https://json-schemas.lens.dev/publications/video/1-0-0.json'"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.ARTICLE_LATEST}`, () => {
    it(`then should flag the missing fields`, () => {
      expectSchema(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.ARTICLE_LATEST,
          lens: {
            mainContentFocus: PublicationMainFocus.ARTICLE,
          },
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "lens.id": Required
        · "lens.content": Required
        · "lens.locale": Required"
      `);
    });
  });
});
