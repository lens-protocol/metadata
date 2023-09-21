import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

import { geoUri } from '../../primitives.js';
import {
  MediaAudioMimeType,
  MediaImageMimeType,
  MediaVideoMimeType,
  MetadataLicenseType,
  MetadataTransactionType,
  ThreeDFormat,
} from '../../publication/index.js';
import { ValidationError } from '../ValidationError.js';
import {
  article,
  textOnly,
  audio,
  checkingIn,
  embed,
  image,
  event,
  link,
  liveStream,
  mint,
  space,
  story,
  threeD,
  transaction,
  video,
  shortVideo,
} from '../publications.js';

describe(`Given the publication metadata builders`, () => {
  describe('when setting tags on any publication metadata', () => {
    it('should ensure they at 20 at most', () => {
      expect(() =>
        article({
          title: 'Great Question',
          content: 'What is the answer to life, the universe and everything?',
          tags: faker.word.words(21).split(''),
        }),
      ).toThrowError(ValidationError);
    });

    it('should ensure they are unique', () => {
      expect(() =>
        article({
          title: 'Great Question',
          content: 'What is the answer to life, the universe and everything?',
          tags: ['question', '42', '42'],
        }),
      ).toThrowError(ValidationError);
    });
  });

  describe(`when using the ${article.name} builder`, () => {
    it('should return a valid TextOnlyMetadata', () => {
      const metadata = article({
        title: 'Great Question',
        content: `
        ## Heading

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.

        ## Question

        What is the answer to life, the universe and everything?

        ## Answer

        42

        ![The answer](https://example.com/answer.png)
        `,
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

  describe(`when using the ${audio.name} builder`, () => {
    it('should return a valid AudioMetadata', () => {
      const metadata = audio({
        title: 'Great song!',
        audio: {
          item: 'https://example.com/song.mp3',
          type: MediaAudioMimeType.MP3,
          artist: 'John Doe',
          cover: 'https://example.com/cover.png',
        },
        attachments: [
          {
            item: 'https://example.com/song-1.mp3',
            type: MediaAudioMimeType.MP3,
            duration: 234,
          },
          {
            item: 'https://example.com/song-2.mp3',
            type: MediaAudioMimeType.MP3,
            duration: 345,
          },
        ],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${checkingIn.name} builder`, () => {
    it('should return a valid CheckingInMetadata for Geo URI location', () => {
      const metadata = checkingIn({
        location: 'The Moon',
        position: geoUri({
          lat: 40.6892,
          lng: -74.0444,
        }),
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });

    it('should return a valid CheckingInMetadata for PhysicalAddress', () => {
      const metadata = checkingIn({
        location: 'The Moon',
        address: {
          streetAddress: '1st Street',
          locality: 'New York',
          region: 'NY',
          postalCode: '10001',
          country: 'US',
        },
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${embed.name} builder`, () => {
    it('should return a valid EmbedMetadata', () => {
      const metadata = embed({
        embed: 'https://example.com/embed.html',
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${event.name} builder`, () => {
    it('should return a valid EventMetadata for Geo URI location', () => {
      const metadata = event({
        location: 'The Moon',
        position: geoUri({
          lat: 40.6892,
          lng: -74.0444,
        }),
        startsAt: '2028-10-01T00:00:00Z',
        endsAt: '2028-10-01T01:00:00Z',
        links: ['https://example.com/tickets.html'],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });

    it('should return a valid EventMetadata for PhysicalAddress', () => {
      const metadata = event({
        location: 'The Moon',
        address: {
          streetAddress: '1st Street',
          locality: 'New York',
          region: 'NY',
          postalCode: '10001',
          country: 'US',
        },
        startsAt: '2028-10-01T00:00:00Z',
        endsAt: '2028-10-01T01:00:00Z',
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${image.name} builder`, () => {
    it('should return a valid ImageMetadata', () => {
      const metadata = image({
        title: 'Touch grass',
        image: {
          item: 'https://example.com/image.png',
          type: MediaImageMimeType.PNG,
          altTag: 'Me touching grass',
          license: MetadataLicenseType.CCO,
        },
        attachments: [
          {
            item: 'https://example.com/image-1.png',
            type: MediaImageMimeType.PNG,
            license: MetadataLicenseType.CC_BY_NC,
            altTag: 'Me touching a tree',
          },
          {
            item: 'https://example.com/image-2.png',
            type: MediaImageMimeType.PNG,
            license: MetadataLicenseType.CC_BY_NC,
            altTag: 'The tree touching me',
          },
        ],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${link.name} builder`, () => {
    it('should return a valid LinkMetadata', () => {
      const metadata = link({
        sharingLink: 'https://example.com/embed.html',
        content: 'Check out this cool website!',
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${liveStream.name} builder`, () => {
    it('should return a valid LiveStreamMetadata', () => {
      const metadata = liveStream({
        title: 'Live stream #1',
        liveUrl: 'https://example.com/live.html',
        playbackUrl: 'https://example.com/playback.html',
        startsAt: '2028-10-01T00:00:00Z',
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });

    describe(`when using the ${mint.name} builder`, () => {
      it('should return a valid MintMetadata', () => {
        const metadata = mint({
          content: 'Check out this NFT!',
          mintLink:
            'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/1234567890',
        });

        expect(metadata).toMatchSnapshot({
          lens: {
            id: expect.any(String),
          },
        });
      });
    });
  });

  describe(`when using the ${space.name} builder`, () => {
    it('should return a valid SpaceMetadata', () => {
      const metadata = space({
        title: 'Space #1',
        link: 'https://example.com/space.html',
        startsAt: '2028-10-01T00:00:00Z',
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${story.name} builder`, () => {
    it('should return a valid StoryMetadata', () => {
      const metadata = story({
        asset: {
          item: 'https://example.com/story.mp4',
          type: MediaVideoMimeType.MP4,
          cover: 'https://example.com/thumbnail.png',
          duration: 123,
          altTag: 'The story of my life',
        },
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${threeD.name} builder`, () => {
    it('should return a valid ThreeDMetadata', () => {
      const metadata = threeD({
        content: 'Check out this 3D model!',
        assets: [
          {
            format: ThreeDFormat.VRM,
            playerUrl: 'https://example.com/player.html',
            uri: 'https://example.com/model.zip',
            zipPath: 'foo/model.vrm',
          },
        ],
        tags: ['3d', 'vrm'],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${transaction.name} builder`, () => {
    it('should return a valid TransactionMetadata', () => {
      const metadata = transaction({
        chainId: 1,
        txHash: '0x1234567890',
        content: 'Check out this transaction!',
        type: MetadataTransactionType.ERC20,
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

  describe(`when using the ${video.name} builder`, () => {
    it('should return a valid VideoMetadata', () => {
      const metadata = video({
        title: 'Great video!',
        video: {
          item: 'https://example.com/video.mp4',
          type: MediaVideoMimeType.MP4,
          cover: 'https://example.com/thumbnail.png',
          duration: 123,
          altTag: 'The video of my life',
          license: MetadataLicenseType.CCO,
        },
        attachments: [
          {
            item: 'https://example.com/soundtrack.mp3',
            type: MediaAudioMimeType.MP3,
            license: MetadataLicenseType.CCO,
          },
        ],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the ${shortVideo.name} builder`, () => {
    it('should return a valid VideoMetadata', () => {
      const metadata = shortVideo({
        title: 'Great video!',
        video: {
          item: 'https://example.com/video.mp4',
          type: MediaVideoMimeType.MP4,
          cover: 'https://example.com/thumbnail.png',
          duration: 123,
          altTag: 'The video of my life',
          license: MetadataLicenseType.CCO,
        },
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });
});
