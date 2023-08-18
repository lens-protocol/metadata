import { describe, it } from '@jest/globals';

import { expectSchema } from '../../../__helpers__/assertions.js';
import { MediaAudioSchema, MediaAudioKind } from '../media.js';

describe(`Given the media schemas`, () => {
  describe(`when parsing an invalid media audio object`, () => {
    it('then should', () => {
      expectSchema(() =>
        MediaAudioSchema.safeParse({
          type: MediaAudioKind.AUDIOBOOK,
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "item": Required
        · "type": Invalid enum value. Expected 'audio/wav' | 'audio/vnd.wave' | 'audio/mpeg' | 'audio/ogg' | 'audio/mp4' | 'audio/aac' | 'audio/webm' | 'audio/flac', received 'AUDIOBOOK'"
      `);
    });
  });
});
