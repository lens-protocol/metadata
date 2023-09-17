import { describe, expect, it } from '@jest/globals';

import { ValidationError, article, textOnly, profile, audio } from '../builders.js';
import { MediaAudioMimeType, MediaImageMimeType } from '../publication/index.js';

describe(`Given the publication metadata builders`, () => {
  describe(`when using the ${article.name} builder`, () => {
    it('should return a valid TextOnlyMetadata', () => {
      const metadata = article({
        title: 'Great Question',
        content: 'GM!',
        tags: ['question', '42'],
        attachments: [
          {
            item: 'https://example.com/answer',
            type: MediaImageMimeType.PNG,
            altTag: 'The answer',
          },
        ],
      });

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
      const metadata = audio({
        title: 'Great song!',
        audio: {
          item: 'https://example.com/song.mp3',
          type: MediaAudioMimeType.MP3,
          artist: 'John Doe',
          cover: 'https://example.com/cover.png',
        },
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
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

  describe(`when using the ${profile.name} builder`, () => {
    it('should return a valid ProfileMetadata', () => {
      const metadata = profile({ name: 'John Doe' });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
          name: 'John Doe',
        },
      });
    });
  });
});
