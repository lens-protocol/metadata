import { describe, it } from '@jest/globals';
import {
  LensClient,
  production,
  ExplorePublicationsOrderByType,
  LimitType,
} from '@lens-protocol/client';

import { formatZodError } from '../../formatters.js';
import { invariant } from '../../utils.js';
import { PublicationMetadataSchema } from '../index.js';

export const toUsableUrl = (src: string) => {
  const url = new URL(src);

  switch (url.protocol) {
    case 'ipfs:':
      return `https://gw.ipfs-lens.dev/ipfs/${url.hostname}`;

    case 'ar:':
      return `https://arweave.net/${url.hostname}`;

    default:
      return src;
  }
};

describe(`Given the PublicationMetadataSchema`, () => {
  const client = new LensClient({
    environment: production,
  });

  describe(`when parsing the last 50 publications`, () => {
    it('should pass without errors', async () => {
      const page = await client.explore.publications({
        orderBy: ExplorePublicationsOrderByType.Latest,
        limit: LimitType.Fifty,
      });

      await Promise.all(
        page.items.map(async (pub) => {
          const url = toUsableUrl(pub.metadata.rawURI);
          const response = await fetch(url);

          invariant(
            response.ok,
            `Failed to fetch metadata for ${pub.id}: ${url}, status: ${response.status}`,
          );

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const json = await response.json();

          const result = PublicationMetadataSchema.safeParse(json);

          if (result.success) {
            return;
          }

          throw new Error(
            `Failed to parse metadata for ${pub.id} (${url}) due to ${formatZodError(
              result.error,
            )}`,
          );
        }),
      );
    }, 100_000);
  });
});
