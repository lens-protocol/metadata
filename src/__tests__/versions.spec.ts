import { describe, expect, it } from '@jest/globals';

import { mockProfileMetadata } from '../profile/__helpers__/mocks.js';
import { mockMirrorMetadata, mockTextOnlyMetadata } from '../publication/__helpers__/mocks.js';
import { extractMajorVersion, extractVersion } from '../versions.js';

describe(`Given the version helper functions`, () => {
  describe(`when invoking "${extractVersion.name}" on PublicationMetadata`, () => {
    it('then it should extract the version', () => {
      const metadata = mockTextOnlyMetadata();

      expect(extractVersion(metadata)).toMatchInlineSnapshot(`"3.1.0"`);
    });
  });

  describe(`when invoking "${extractVersion.name}" on ProfileMetadata`, () => {
    it('then it should extract the version', () => {
      const metadata = mockProfileMetadata();

      expect(extractVersion(metadata)).toMatchInlineSnapshot(`"2.0.0"`);
    });
  });

  describe(`when invoking "${extractVersion.name}" on MirrorMetadata`, () => {
    it('then it should extract the version', () => {
      const metadata = mockMirrorMetadata();

      expect(extractVersion(metadata)).toMatchInlineSnapshot(`"1.0.0"`);
    });
  });

  describe(`when invoking "${extractMajorVersion.name}" on PublicationMetadata`, () => {
    it('then it should extract the version', () => {
      const metadata = mockTextOnlyMetadata();

      expect(extractMajorVersion(metadata)).toMatchInlineSnapshot(`"3"`);
    });
  });

  describe(`when invoking "${extractMajorVersion.name}" on ProfileMetadata`, () => {
    it('then it should extract the version', () => {
      const metadata = mockProfileMetadata();

      expect(extractMajorVersion(metadata)).toMatchInlineSnapshot(`"2"`);
    });
  });

  describe(`when invoking "${extractMajorVersion.name}" on MirrorMetadata`, () => {
    it('then it should extract the version', () => {
      const metadata = mockMirrorMetadata();

      expect(extractMajorVersion(metadata)).toMatchInlineSnapshot(`"1"`);
    });
  });
});
