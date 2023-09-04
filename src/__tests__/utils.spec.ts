import { describe, expect, it } from '@jest/globals';

import { mockProfileMetadata } from '../profile/__helpers__/mocks';
import { mockTextOnlyMetadata } from '../publication/__helpers__/mocks';
import { extractVersion } from '../utils';

describe(`Given the ${extractVersion.name} function`, () => {
  describe('when invoked on PublicationMetadata', () => {
    it('then it should extract the version', () => {
      const metadata = mockTextOnlyMetadata();

      expect(extractVersion(metadata)).toMatchInlineSnapshot(`"3.0.0"`);
    });
  });

  describe('when invoked on ProfileMetadata', () => {
    it('then it should extract the version', () => {
      const metadata = mockProfileMetadata();

      expect(extractVersion(metadata)).toMatchInlineSnapshot(`"2.0.0"`);
    });
  });
});
