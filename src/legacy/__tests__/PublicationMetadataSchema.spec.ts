import { describe, it } from '@jest/globals';

import { expectResult } from '../../__helpers__/assertions.js';
import { PublicationMainFocus, PublicationMetadataSchema } from '../index.js';

describe(`Given the PublicationMetadataSchema`, () => {
  describe(`when parsing an empty object`, () => {
    it(`then it should complain about the missing version`, () => {
      expectResult(() => PublicationMetadataSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "version": Required"
      `);
    });

    it(`then it should complain about invalid version`, () => {
      expectResult(() => PublicationMetadataSchema.safeParse({ version: '42' }))
        .toMatchInlineSnapshot(`
        "fix the following issues
        · "version": Invalid enum value. Expected '1.0.0' | '2.0.0', received '42'"
      `);
    });
  });

  describe(`when parsing an invalid v1 object`, () => {
    it(`then it should complain about missing basic mandatory fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "name": Required
        · "attributes": Required
        · "metadata_id": Required"
      `);
    });

    it('then it should pass on expected nullable fields', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          content: 'a',

          animation_url: null,
          appId: null,
          contentWarning: null,
          description: null,
          external_url: null,
          image: null,
          media: null,
          tags: null,
        }),
      ).toMatchObject({
        animation_url: null,
        appId: null,
        contentWarning: null,
        description: null,
        external_url: null,
        image: null,
        media: null,
        tags: null,
      });
    });

    it('then it should pass on `appId` set to empty string', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          content: 'a',

          appId: '',
        }),
      ).toMatchObject({
        appId: '',
      });
    });

    it(`then it should check at least one between content, image, and media is present`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "content": At least one between content, image, and media must be present. Content must be over 1 character.
        · "image": At least one between content, image, and media must be present.
        · "media": At least one between content, image, and media must be present."
      `);
    });

    it('then it should complain about empty content', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          content: '',
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "content": At least one between content, image, and media must be present. Content must be over 1 character.
        · "image": At least one between content, image, and media must be present.
        · "media": At least one between content, image, and media must be present."
      `);
    });

    it('then it should complain about too long content', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          content: 'a'.repeat(30001),
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "content": String must contain at most 30000 character(s)"
      `);
    });

    it('then it should be resilient with invalid media items', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: '123',
          name: '123',
          content: 'lorem',
          attributes: [],
          media: [
            {},
            {
              cover: 'https://example.com/image.png',
              // missing `item`
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        {
          "attributes": [],
          "content": "lorem",
          "media": [],
          "metadata_id": "123",
          "name": "123",
          "version": "1.0.0",
        }
      `);
    });
  });

  describe(`when parsing an invalid v2 object`, () => {
    it(`then it should complain about missing basic mandatory fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          mainContentFocus: PublicationMainFocus.TEXT_ONLY,
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "name": Required
        · "attributes": Required
        · "metadata_id": Required
        · "content": Required
        · "locale": Required"
      `);
    });

    it('then it should be resilient to invalid v2 fields', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          content: 'a',
          locale: 'en',
          contentWarning: 'NOVALID',
          mainContentFocus: PublicationMainFocus.TEXT_ONLY,
          tags: ['a'.repeat(51), '', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        }),
      ).toMatchInlineSnapshot(`
        {
          "attributes": [],
          "content": "a",
          "contentWarning": null,
          "locale": "en",
          "mainContentFocus": "TEXT_ONLY",
          "metadata_id": "123",
          "name": "123",
          "tags": [
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
          ],
          "version": "2.0.0",
        }
      `);
    });

    it(`then it should complain about invalid ${PublicationMainFocus.ARTICLE} metadata`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          mainContentFocus: PublicationMainFocus.ARTICLE,
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "content": Required"
      `);
    });

    it(`then it should complain about invalid ${PublicationMainFocus.AUDIO} metadata`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          mainContentFocus: PublicationMainFocus.AUDIO,
          media: [
            {
              item: 'https://example.com/image.png',
              type: 'image/png',
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "media": Metadata AUDIO requires an audio to be attached."
      `);
    });

    it(`then it should complain about invalid ${PublicationMainFocus.IMAGE} metadata`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          mainContentFocus: PublicationMainFocus.IMAGE,
          media: [
            {
              item: 'https://example.com/dunno.42',
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "media": Metadata IMAGE requires an image to be attached."
      `);
    });

    it(`then it should complain about invalid ${PublicationMainFocus.LINK} metadata`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          content: 'somehting without a URL',
          mainContentFocus: PublicationMainFocus.LINK,
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "content": Metadata LINK requires a valid https link"
      `);
    });

    it(`then it should complain about invalid ${PublicationMainFocus.TEXT_ONLY} metadata`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          mainContentFocus: PublicationMainFocus.TEXT_ONLY,
          media: [
            {
              item: 'https://example.com/image.png',
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "content": Required
        · "media": Metadata TEXT cannot have media"
      `);
    });

    it(`then it should complain about invalid ${PublicationMainFocus.VIDEO} metadata`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          mainContentFocus: PublicationMainFocus.VIDEO,
          media: [
            {
              item: 'https://example.com/dunno.42',
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "media": Metadata VIDEO requires an image to be attached."
      `);
    });

    it('then it should complain about missing encryptionParams', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          mainContentFocus: PublicationMainFocus.TEXT_ONLY,
          content: 'a',
          encryptionParams: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "encryptionParams.accessCondition": Required
        · "encryptionParams.encryptedFields": Required
        · "encryptionParams.providerSpecificParams": Required"
      `);
    });

    it('then it should complain about invalid encryptionParams', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '123',
          name: '123',
          attributes: [],
          locale: 'en',
          mainContentFocus: PublicationMainFocus.TEXT_ONLY,
          content: 'a',
          encryptionParams: {
            accessCondition: {
              and: {
                criteria: [],
              },
              or: {
                criteria: [
                  {
                    collect: {
                      publicationId: '0x01-0x01',
                    },
                    profile: {
                      profileId: '0x01',
                    },
                  },
                ],
              },
            },
            providerSpecificParams: {
              encryptionKey: '0x...',
            },
            encryptedFields: {
              content: 42,
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "encryptionParams.accessCondition.or.criteria[0]": Unrecognized key(s) in object: 'profile'
        · "encryptionParams.accessCondition.or.criteria": Invalid OR condition: should have at least 2 conditions
        · "encryptionParams.accessCondition": Unrecognized key(s) in object: 'and'
        · "encryptionParams.encryptedFields.content": Expected string, received number
        · "encryptionParams.providerSpecificParams.encryptionKey": Encryption key should be 368 characters long."
      `);
    });
  });

  describe('when performing regression testing', () => {
    it('then it should support empty strings as `description`', () => {
      PublicationMetadataSchema.parse({
        version: '1.0.0',
        metadata_id: '6b28028a-8c14-4f40-84db-162fb00f2edf',
        description: '',
        content: '长大你会后悔的，兄弟\n\n',
        external_url: null,
        image: 'https://ipfs.infura.io/ipfs/QmUw2tBksDGrg6aFZj2zLzHNEPqTYofrDdrPXFUhDAFUex',
        imageMimeType: 'image/jpeg',
        name: '长大你会后悔的，兄弟',
        attributes: [
          {
            traitType: 'string',
            key: 'publication',
            trait_type: 'publication',
            value: 'video',
          },
          {
            traitType: 'string',
            trait_type: 'handle',
            key: 'handle',
            value: '@huobi.test',
          },
          {
            traitType: 'string',
            key: 'app',
            trait_type: 'app',
            value: 'lenstube',
          },
        ],
        media: [
          {
            item: 'https://arweave.net/L4sxHApbh5z9tzYjgrErg38tqkOua91tj66yuVf075g',
            type: 'video/mp4',
          },
          {
            item: 'https://livepeercdn.com/asset/e172we0o7hnzj7dk/video',
            type: 'video/mp4',
          },
        ],
        appId: 'Lenstube',
      });
    });

    it('then it should support `number` as marketplace `attributes[n].value`', () => {
      PublicationMetadataSchema.parse({
        version: '1.0.0',
        metadata_id: '9f490668-82fb-4b83-b980-afd79d016003',
        description: '',
        content: null,
        external_url: null,
        image: 'https://prnts.mypinata.cloud/ipfs/QmXwsyxrSRBE97WidDFUbW11zWnao76goQ8PmANqtAfBQ8',
        imageMimeType: 'image/png',
        name: 'Silence',
        attributes: [
          {
            displayType: 'string',
            traitType: 'Artist Name',
            value: 'Marshmello',
          },
          {
            displayType: 'date',
            traitType: 'Release Date',
            value: '2022-07-28T00:00:00.000Z',
          },
          {
            displayType: 'string',
            traitType: 'Record Label',
            value: 'Silence',
          },
          {
            displayType: 'string',
            traitType: 'Language',
            value: 'English',
          },
          {
            displayType: 'string',
            traitType: 'Primary Genre',
            value: 'Pop',
          },
          {
            displayType: 'string',
            traitType: 'Secondary Genre',
            value: 'EDM',
          },
          {
            displayType: 'string',
            traitType: 'Album Cover',
            value:
              'https://prnts.mypinata.cloud/ipfs/QmXwsyxrSRBE97WidDFUbW11zWnao76goQ8PmANqtAfBQ8',
          },
          {
            displayType: 'string',
            traitType: 'Album Cover Type',
            value: 'image/png',
          },
          {
            displayType: 'string',
            traitType: 'Price per share',
            value: '1',
          },
          {
            displayType: 'string',
            traitType: 'Token Limit',
            value: '5',
          },
          {
            displayType: 'string',
            traitType: 'Percentage offered',
            value: '0.1',
          },
          {
            displayType: 'number',
            traitType: 'Number of Tracks',
            value: 1,
          },
          {
            displayType: 'string',
            traitType: 'Track 0',
            value: 'bafkreidlajlzfgd5gw6gigvhjy5iqsvfnbt6k6ou4vnvxq5bcp2wedpria',
          },
        ],
        media: [
          {
            item: 'https://prnts.mypinata.cloud/ipfs/Qmbbw13wVGynkNyp8nGpmVruX7pn1fWJHZx3wLgmpP7pXA',
            type: 'audio/wav',
          },
        ],
        appId: '0xc5623eefa1f097b47be8a5da6f229a51b1c72d44',
      });
    });

    it('then it should support empty string as `attributes[n].value`', () => {
      PublicationMetadataSchema.parse({
        version: '1.0.0',
        metadata_id: 'f8057d77-6ccd-43e9-8c7f-29660258d04c',
        description: 'dskjlfh jksdh uih ejfkhsdau fhejkfhsdaf ewqra',
        content: 'dskjlfh jksdh uih ejfkhsdau fhejkfhsdaf ewqra',
        external_url: 'https://theshare.fr',
        image: 'https://avatar.tobi.sh/share',
        imageMimeType: 'image/png',
        name: 'Post by @share',
        attributes: [
          {
            traitType: 'type',
            value: 'post',
          },
          {
            traitType: 'feels',
            value: '',
          },
        ],
        media: [],
        appId: 'share_post',
      });
    });

    it('then it should be resilient to invalid `image` property', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '1.0.0',
          metadata_id: '2c4dd150-34a5-4846-859c-c9070761d93d',
          description: 'gtte',
          content: 'gtte',
          external_url: 'https://theshr.xyz',
          image: {
            item: 'https://cloudflare-ipfs.com/ipfs/QmbL8etpvTHWFEYmyPzqBn7cqv3yyaxpfQmqNTimA2718F',
            type: 'image/jpeg',
          },
          imageMimeType: 'image/png',
          name: 'Post by @share',
          attributes: [
            {
              traitType: 'type',
              value: 'post',
            },
            {
              traitType: 'feels',
              value: '',
            },
          ],

          media: [
            {
              item: 'https://cloudflare-ipfs.com/ipfs/QmbL8etpvTHWFEYmyPzqBn7cqv3yyaxpfQmqNTimA2718F',
              type: 'image/jpeg',
            },
          ],

          appId: 'share_post',
        }),
      ).toMatchInlineSnapshot(`
        {
          "appId": "share_post",
          "attributes": [
            {
              "traitType": "type",
              "value": "post",
            },
            {
              "traitType": "feels",
              "value": "",
            },
          ],
          "content": "gtte",
          "description": "gtte",
          "external_url": "https://theshr.xyz",
          "image": null,
          "imageMimeType": "image/png",
          "media": [
            {
              "item": "https://cloudflare-ipfs.com/ipfs/QmbL8etpvTHWFEYmyPzqBn7cqv3yyaxpfQmqNTimA2718F",
              "type": "image/jpeg",
            },
          ],
          "metadata_id": "2c4dd150-34a5-4846-859c-c9070761d93d",
          "name": "Post by @share",
          "version": "1.0.0",
        }
      `);

      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '8fd4108e-ee4d-4fff-9cdf-2a59342a67ea',
          description:
            'Lorem ipsum dolor sit amet. Et similique dignissimos eum obcaecati voluptas et ratione nobis hic commodi unde ut libero ipsum et officia cupiditate ut internos debitis. Hic dolorem nisi non nesciunt placeat eos nihil dolor vel perspiciatis voluptatem eos galisum cumque quo repellendus sint est tempora accusantium. Ut culpa porro aut fuga iste 33 omnis rerum. Ea assumenda accusantium qui illum velit ut modi veritatis aut similique aliquam et cupiditate dolor?\n\nUt quis quod et voluptatem nobis est dolores reprehenderit nam porro consequuntur. Aut aperiam unde non quia sint est quia nihil ut dolor dolores rem esse veniam. Ut neque voluptatem ut dolorum eveniet est reprehenderit quia sed sunt necessitatibus qui aliquam rerum.',
          content: 'this is a sample long post ',
          external_url: null,
          image: 'ipfs//:bafkreibbydhgzfdapyu3ra3ei7xxnhaqaw4acczhdmb5b6xqrobuzmlkaa',
          imageMimeType: null,
          name: 'Name',
          attributes: [],
          media: [],
          appId: 'api_examples_github',
          animation_url: null,
          locale: 'en-us',
          tags: ['using_api_examples'],
          mainContentFocus: 'TEXT_ONLY',
        }),
      ).toMatchInlineSnapshot(`
        {
          "animation_url": null,
          "appId": "api_examples_github",
          "attributes": [],
          "content": "this is a sample long post ",
          "description": "Lorem ipsum dolor sit amet. Et similique dignissimos eum obcaecati voluptas et ratione nobis hic commodi unde ut libero ipsum et officia cupiditate ut internos debitis. Hic dolorem nisi non nesciunt placeat eos nihil dolor vel perspiciatis voluptatem eos galisum cumque quo repellendus sint est tempora accusantium. Ut culpa porro aut fuga iste 33 omnis rerum. Ea assumenda accusantium qui illum velit ut modi veritatis aut similique aliquam et cupiditate dolor?

        Ut quis quod et voluptatem nobis est dolores reprehenderit nam porro consequuntur. Aut aperiam unde non quia sint est quia nihil ut dolor dolores rem esse veniam. Ut neque voluptatem ut dolorum eveniet est reprehenderit quia sed sunt necessitatibus qui aliquam rerum.",
          "external_url": null,
          "image": "ipfs//:bafkreibbydhgzfdapyu3ra3ei7xxnhaqaw4acczhdmb5b6xqrobuzmlkaa",
          "imageMimeType": null,
          "locale": "en-us",
          "mainContentFocus": "TEXT_ONLY",
          "media": [],
          "metadata_id": "8fd4108e-ee4d-4fff-9cdf-2a59342a67ea",
          "name": "Name",
          "tags": [
            "using_api_examples",
          ],
          "version": "2.0.0",
        }
      `);
    });

    it('then it should be resilient to invalid `external_url`', () => {
      PublicationMetadataSchema.parse({
        version: '1.0.0',
        metadata_id: 'd8a19d14-de14-45a7-911e-b710465238f5',
        description: 'Test post',
        content: 'Test post',
        external_url: '',
        image:
          'https://ipfs.infura.io/ipfs/bafkreia5wo5fx7rprcx6py265sebep5gnlnlgkcblciqtfkg4f6p4tusri',
        imageMimeType: 'image/webp',
        name: 'Test post',
        attributes: [
          {
            traitType: 'string',
            key: 'type',
            value: 'post',
          },
        ],
        media: [
          {
            item: 'https://ipfs.infura.io/ipfs/bafkreia5wo5fx7rprcx6py265sebep5gnlnlgkcblciqtfkg4f6p4tusri',
            type: 'image/webp',
          },
        ],
        appId: 'ahta',
      });
    });

    it('then it should be resilient to invalid `image`', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: '23e6c4ba-2dbf-460f-87b5-a4e19875cec8',
        description: '',
        content: 'Give me the fat  / Отдай сало',
        external_url: 'https://testnet.lenstube.xyz',
        image: '',
        imageMimeType: null,
        name: 'Give me the fat  / Отдай сало',
        attributes: [
          {
            displayType: 'string',
            traitType: 'publication',
            value: 'video',
          },
          {
            displayType: 'string',
            traitType: 'handle',
            value: '@ayerect.test',
          },
          {
            displayType: 'string',
            traitType: 'app',
            value: 'lenstube',
          },
          {
            displayType: 'string',
            traitType: 'durationInSeconds',
            value: '21.13',
          },
        ],
        media: [
          {
            item: 'ipfs://bafybeifkxcz7xs2a6u6wcxmlc54gk37fe4p347adpk4ibzvv7kb7x5jvve',
            type: 'video/mp4',
          },
        ],
        appId: 'lenstube',
        locale: 'en',
        tags: ['people', 'lenstube'],
        mainContentFocus: 'VIDEO',
      });
    });

    it('then it should be resilient to empty string as `media[n].item` but still check v2 integrity', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: 'f050ed79-563a-452b-a7f1-7f66b30b0f31',
          description: '',
          content: 'the  testing post',
          external_url: null,
          image: 'https://ipfs.moralis.io:2053/ipfs/QmefBKygWViB4PPK8ksKMJzPwMXTTihheg8LPRLf4hXW2p',
          imageMimeType: 'image/png',
          name: 'the  testing post',
          attributes: [],
          media: [
            {
              item: '',
              type: 'audio/mpeg',
            },
          ],

          appId: 'audafo',
          animation_url: null,
          locale: 'en-us',
          tags: [],
          mainContentFocus: 'AUDIO',
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "media": Metadata AUDIO requires an audio to be attached."
      `);
    });

    // this should indeed fail
    it.skip('then it should be resilient to `null` as `content` for TEXT_ONLY publications', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: '2NIqXaSSHePwi3rKX_4V4',
        description: 'test collaborate',
        content: null,
        external_url: 'https://dataverse.art/',
        image:
          'https://bafybeif2xgqpawh3t6dj2ftfno7tprugcntdq4qoq7u2vxqvulvzlsiixe.ipfs.nftstorage.link/',
        imageMimeType: null,
        name: 'testCollaborate',
        attributes: [],
        media: [],
        appId: 'dataverse-v0.1.0',
        animation_url: null,
        locale: 'en',
        tags: [],
        mainContentFocus: 'TEXT_ONLY',
      });
    });

    it('then it should be resilient to `null` as `animation_url`', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: 'e737a879-14d0-462f-82ce-d867ebab348c',
        description: 'Description',
        content: 'blubbr is lit!!!',
        external_url: null,
        image: null,
        imageMimeType: null,
        name: 'Name',
        attributes: [],
        media: [
          {
            item: 'ipfs://QmQLqEHE6rsfjKYtQZJnAB8m2TVhy86JV3KQf9bwdktnSg',
            type: 'image/png',
          },
        ],
        appId: 'blubbr',
        animation_url: null,
        locale: 'en-us',
        tags: ['blubbr'],
        mainContentFocus: 'EMBED',
      });
    });

    it('then it should be resilient to invalid `contentWarning`', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: '6fcf9143-d445-498f-be8a-e2e58660ff53',
        description: null,
        content:
          '"I’m convinced the AirPods Max active noise cancellation has gotten worse"\n\n"I hadn’t thought about firmware; I just knew it worsened."\n\nhttps://www.theverge.com/2022/9/24/23368439/airpods-max-anc-active-noise-canceling-weakened-firmware-experience-appke',
        external_url: null,
        image: null,
        imageMimeType: null,
        name: 'Post by @paulburke.test',
        attributes: [],
        media: [],
        appId: 'focalize',
        animation_url: null,
        locale: 'en',
        tags: ['apple', 'airpods max'],
        contentWarning: '',
        mainContentFocus: 'LINK',
      });
    });

    it('then it should be resilient to `null` as `animation_url`', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: 'e737a879-14d0-462f-82ce-d867ebab348c',
        description: 'Description',
        content: 'blubbr is lit!!!',
        external_url: null,
        image: null,
        imageMimeType: null,
        name: 'Name',
        attributes: [],
        media: [
          {
            item: 'ipfs://QmQLqEHE6rsfjKYtQZJnAB8m2TVhy86JV3KQf9bwdktnSg',
            type: 'image/png',
          },
        ],
        appId: 'blubbr',
        animation_url: null,
        locale: 'en-us',
        tags: ['blubbr'],
        mainContentFocus: 'EMBED',
      });
    });

    it('then it should be empty string as `tag[n]`', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: 'fe9f30ca-a7da-4fea-86df-de726a1dca4d',
        description: 'still works?',
        content: 'still works?',
        external_url: null,
        image: null,
        imageMimeType: null,
        name: 'still works?',
        attributes: [
          {
            displayType: 'string',
            traitType: 'tag',
            value: '',
          },
          {
            displayType: 'string',
            traitType: 'company_name',
          },
          {
            displayType: 'string',
            traitType: 'job_title',
          },
        ],

        media: [],
        appId: 'social3',
        animation_url: null,
        locale: 'en-us',
        tags: [''],
        mainContentFocus: 'TEXT_ONLY',
      });
    });

    it('then it should be resilient to empty string as `media[n].cover`', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: '66ae518d-2b2d-40c4-90f4-f46294ccda43',
        description: 'this  is  latest  song  dropped  by  ryvanny ',
        content: 'Only  Youu',
        external_url: null,
        image: 'https://ipfs.moralis.io:2053/ipfs/QmY5zpxT277qjT6o9PXWbx7oRa9DySFH6QU2AprP6Gg7af',
        imageMimeType: 'image/jpeg',
        name: 'Only  Youu',
        attributes: [],
        media: [
          {
            item: 'https://ipfs.moralis.io:2053/ipfs/QmS3v23AH7dUddBzfV6NMPe8Gu4mRqQgYRxVDzisp4vS3d',
            altTag: '',
            cover: '',
            type: 'audio/mpeg',
          },
        ],
        appId: 'audios',
        animation_url: null,
        locale: 'en-us',
        tags: ['rayvanny', 'abdul'],
        mainContentFocus: 'AUDIO',
      });
    });

    it('then it should support `encryptionParams.providerSpecificParams` and placeholder text in `media[n].item`, `media[n].cover`', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: 'a3541d9f-5928-46e9-9b26-a4310bf75d43',
          description:
            'This post is gated. It can be unlocked here -> https://www.comp0z.xyz/pub/0x51c5-0x43',
          content:
            'This post is gated. It can be unlocked here -> https://www.comp0z.xyz/pub/0x51c5-0x43',
          external_url: 'https://www.comp0z.xyz/pub/0x51c5-0x43',
          image: null,
          imageMimeType: 'video/quicktime',
          name: 'Lens Post by @jaenjaen.test',
          attributes: [
            {
              traitType: 'type',
              displayType: 'string',
              value: 'video',
            },
          ],

          media: [
            {
              item: 'This publication is gated.',
              type: 'video/quicktime',
              source: null,
            },
          ],

          appId: 'comp0z.xyz',
          animation_url: null,
          locale: 'en-us',
          tags: [],
          contentWarning: null,
          mainContentFocus: 'VIDEO',
          encryptionParams: {
            providerSpecificParams: {
              encryptionKey:
                '04278c188c9eb46d1c9f01940ed77a6d456de9f05d0292be01556270c8fa16bc521d23b3667a7eeabc1b195adc3dad094cd47213771a4a7bff0f366ac8000ba77307eb9c2eb08d8a9f8af4a692271853d51faf6e2848f42b480e18521023248c0429bd755b59caba50b29d14afdf0752397f0ad8b69d5891ef167f82c2ee8d9a00000000000000200a1d105a6e9d4dd4c855bb965ca279a1af3b94c657eb2a63bc8e846f877eb0dddab0809c3eafa46ae7c1c008cea1afa0',
            },
            encryptionProvider: 'lit-protocol',
            encryptedFields: {
              external_url:
                'be4caDlXBUipKf4RBYLKrbMAOlrtzFFL4UgZkNxFp2_7jGGPFVH9hgmr8AKYPdXAFWQwE7yK_EaUfb5RWIggXw==',
              media: [
                {
                  original: {
                    url: 'H5q8DVim7h7plAvECHHONdZCAsPIklFzzm3rrC0r5LNzS_tSHVNijmgFaDYQxS5AoLHEL--kOjOy-Gmv0Qt0xmTolcqJ3JsgjuUv_kCdGro=',
                    cover: null,
                    altTag: null,
                    mimeType: 'video/quicktime',
                  },
                },
              ],
            },
            accessCondition: {
              or: {
                criteria: [
                  {
                    profile: {
                      profileId: '0x51c5',
                    },
                  },
                  {
                    follow: {
                      profileId: '0x51c5',
                    },
                  },
                ],
              },
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "encryptionParams.encryptedFields.media[0].item": Required"
      `); // this one helped find other issues, still should fail due to the error above
    });

    it('then it should be resilient with raw strings as `attributes`', () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          version: '2.0.0',
          metadata_id: '4ccca6a0-eb85-47cf-811e-2e160be4d4ec',
          description: 'Description',
          content: 'Content',
          image: null,
          imageMimeType: null,
          name: 'Name',
          attributes: ['💸 Swap $ETH for $LUNA'],

          media: [],
          appId: 'api_examples_github',
          locale: 'en-us',
          tags: ['using_api_examples'],
          mainContentFocus: 'TEXT_ONLY',
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "attributes[0]": Expected object, received string"
      `);
    });

    it('then it should support optional `CollectCondition.thisPublication`', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: '5b04fde0-de86-4b47-b434-41821489425a',
        description: null,
        content: 'This publication is gated.',
        external_url: null,
        image: null,
        imageMimeType: null,
        name: 'Comment by :driespindola.test',
        attributes: [],
        media: [],
        appId: 'lenstok',
        animation_url: null,
        locale: 'en-us',
        tags: [],
        mainContentFocus: 'TEXT_ONLY',
        encryptionParams: {
          providerSpecificParams: {
            encryptionKey:
              '7c308f3343713b812560e73644ba585d517992466eedb9014912d57d8e01994f8149479d141a0649c687976daf932e0607dfa4906c14813b23d8cd3eeb8d836e8be8dfdf8c419aa9bc0b7cdd51757f55bd99e9b5ce4195b0ee157144843387a8cc3f99c5ee790953b4695c2027e4061dece7a716ca21ef4a8626f203c6b8965d00000000000000208ccfa1cd541b90c7b0b4b65b1f5282543b521388b15f17dc419ebc3a3c88a4252cc194b72bbd2edc4bca15d076a93797',
          },
          encryptionProvider: 'lit-protocol',
          encryptedFields: {
            content: 'Bwxz_ATezEOGKHDG2g-YtmtNlOmP1FS-HgYdR3_sthiEvRQTn_QHPFQBwACVEUEE',
          },
          accessCondition: {
            or: {
              criteria: [
                {
                  profile: {
                    profileId: '0x4fab',
                  },
                },
                {
                  and: {
                    criteria: [
                      {
                        collect: {
                          publicationId: '0x4fab-0x43',
                        },
                      },
                      {
                        follow: {
                          profileId: '0x4fab',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      });
    });

    it('then it should support `encryptionParams.accessCondition` with nested AND/OR(s)', () => {
      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: '42e35810-1634-11ee-a1e4-35b03fa05a29',
        appId: 'orb',
        name: 'Gated Publication',
        description: 'Gated Publication',
        content: 'This publication is gated.',
        mainContentFocus: 'TEXT_ONLY',
        tags: ['gatedorbcommunitiessmurfsociety'],
        attributes: [
          {
            displayType: 'string',
            traitType: 'handle',
            value: '@catastrophe',
          },
          {
            displayType: 'string',
            traitType: 'app',
            value: 'orb',
          },
        ],

        media: [],
        image: null,
        imageMimeType: null,
        animation_url: null,
        external_url: 'This publication is gated.',
        locale: 'en-ES',
        encryptionParams: {
          encryptedFields: {
            content: 'eGaIrzK0thVY669W43V7OLg-diKreuqAF5tx5zuD3ov25stWp-Ok93Hazcv-dyWQ',
            media: [],
            image: null,
            animation_url: null,
            external_url: 'XoDiXK9u_tRKrz_-X0s6ebXPx5PUhASGZaX9mA9pywX3olifSukYQeUczzsnUbBh',
          },
          providerSpecificParams: {
            encryptionKey:
              '9696d09ade64f4d87dd3758b9adc508ed0ae6494519a86c31a00cb43d4c3882bdcb9edd2dea0b9391471a00bb9555c0a9d7a244d59a06e46117af39b257e0eddab47d30fb40ef8a6f8c79a55236e624a98de66d30392b2bd17973e5512533fb56b4ffffc52110df903f2ace7398296b738a2e2447ff8d94c0bf96cbc73eceeeb00000000000000204454467e2ec65d55adce6a4250b7c1c3e58e1b78077153b15c6641e9a60a2c6997db80a5a25c1eeede6e89994e8cf997',
          },
          encryptionProvider: 'LIT_PROTOCOL',
          accessCondition: {
            or: {
              criteria: [
                {
                  profile: {
                    profileId: '0x01a649',
                  },
                },
                {
                  or: {
                    criteria: [
                      {
                        nft: {
                          contractAddress: '0xd4166f411F046dB9AF0369B732e3E0CC3Df890C8',
                          chainID: 137,
                          contractType: 'ERC721',
                        },
                      },
                      {
                        profile: {
                          profileId: '0x01cacd',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      });

      PublicationMetadataSchema.parse({
        version: '2.0.0',
        metadata_id: '42e35810-1634-11ee-a1e4-35b03fa05a29',
        appId: 'orb',
        name: 'Gated Publication',
        description: 'Gated Publication',
        content: 'This publication is gated.',
        mainContentFocus: 'TEXT_ONLY',
        tags: ['gatedorbcommunitiessmurfsociety'],
        attributes: [
          {
            displayType: 'string',
            traitType: 'handle',
            value: '@catastrophe',
          },
          {
            displayType: 'string',
            traitType: 'app',
            value: 'orb',
          },
        ],
        media: [],
        image: null,
        imageMimeType: null,
        animation_url: null,
        external_url: 'This publication is gated.',
        locale: 'en-ES',
        encryptionParams: {
          encryptedFields: {
            content: 'eGaIrzK0thVY669W43V7OLg-diKreuqAF5tx5zuD3ov25stWp-Ok93Hazcv-dyWQ',
            media: [],
            image: null,
            animation_url: null,
            external_url: 'XoDiXK9u_tRKrz_-X0s6ebXPx5PUhASGZaX9mA9pywX3olifSukYQeUczzsnUbBh',
          },
          providerSpecificParams: {
            encryptionKey:
              '9696d09ade64f4d87dd3758b9adc508ed0ae6494519a86c31a00cb43d4c3882bdcb9edd2dea0b9391471a00bb9555c0a9d7a244d59a06e46117af39b257e0eddab47d30fb40ef8a6f8c79a55236e624a98de66d30392b2bd17973e5512533fb56b4ffffc52110df903f2ace7398296b738a2e2447ff8d94c0bf96cbc73eceeeb00000000000000204454467e2ec65d55adce6a4250b7c1c3e58e1b78077153b15c6641e9a60a2c6997db80a5a25c1eeede6e89994e8cf997',
          },
          encryptionProvider: 'LIT_PROTOCOL',
          accessCondition: {
            or: {
              criteria: [
                {
                  profile: {
                    profileId: '0x01a649',
                  },
                },
                {
                  or: {
                    criteria: [
                      {
                        nft: {
                          contractAddress: '0xd4166f411F046dB9AF0369B732e3E0CC3Df890C8',
                          chainID: 137,
                          contractType: 'ERC721',
                        },
                      },
                      {
                        profile: {
                          profileId: '0x01cacd',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      });
    });
  });
});
