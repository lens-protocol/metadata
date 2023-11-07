import { describe, expect, it } from '@jest/globals';

import { expectResult } from '../__helpers__/assertions.js';
import { GeoURISchema, datetimeSchema, geoPoint, geoUri, LocaleSchema } from '../primitives.js';

describe(`Given the primitives schemas`, () => {
  describe(`when parsing a Locale string`, () => {
    it('then it should validate typical locale strings in the format `<language>-<region>`', () => {
      ['en', 'en-GB', 'it', 'it-IT', `es`].forEach((value) => {
        expectResult(() => LocaleSchema.safeParse(value)).toEqual(value);
      });
    });

    it('then it should discard discard `region` defined as three-character', () => {
      expectResult(() => LocaleSchema.safeParse('es-419')).toMatchInlineSnapshot(`"es"`);
    });

    it('then it should flag invalid locale strings', () => {
      expectResult(() => LocaleSchema.safeParse('')).toMatchInlineSnapshot(`
        "fix the following issues
        Should be a valid Locale Identifier. Expected \`[language]\` OR \`[language]-[region]\` format (e.g. \`en\`, \`en-GB\`, \`it\`). [language] MUST be in the ISO 639-1 format. [region], if provided, MUST be in the ISO 3166-1 alpha-2 format."
      `);
      expectResult(() => LocaleSchema.safeParse('english')).toMatchInlineSnapshot(`
        "fix the following issues
        Should be a valid Locale Identifier. Expected \`[language]\` OR \`[language]-[region]\` format (e.g. \`en\`, \`en-GB\`, \`it\`). [language] MUST be in the ISO 639-1 format. [region], if provided, MUST be in the ISO 3166-1 alpha-2 format."
      `);
      expectResult(() => LocaleSchema.safeParse('en-tooodd')).toMatchInlineSnapshot(`
        "fix the following issues
        Should be a valid Locale Identifier. Expected \`[language]\` OR \`[language]-[region]\` format (e.g. \`en\`, \`en-GB\`, \`it\`). [language] MUST be in the ISO 639-1 format. [region], if provided, MUST be in the ISO 3166-1 alpha-2 format."
      `);
    });
  });

  describe(`when parsing a datetime value`, () => {
    it(`then it should support ISO 8601 UTC datetime strings`, () => {
      expectResult(() =>
        datetimeSchema('not used').safeParse('2023-05-16T18:43:35Z'),
      ).toMatchInlineSnapshot(`"2023-05-16T18:43:35Z"`);
    });
  });

  describe(`when parsing a Geo URI value`, () => {
    it(`then it should ensure it's a Geo URI in the the 'geo:lat,lng' format`, () => {
      expectResult(() => GeoURISchema.safeParse(' ')).toMatchInlineSnapshot(`
        "fix the following issues
        Should be a Geo URI. Expected \`geo:lat,lng\`."
      `);
    });

    it(`then it should ensure it's within the expected coordinate limits`, () => {
      expectResult(() => GeoURISchema.safeParse('geo:-90.0000001,0')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be greater than or equal to -90"
      `);
      expectResult(() => GeoURISchema.safeParse('geo:90.0000001,0')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be less than or equal to 90"
      `);
      expectResult(() => GeoURISchema.safeParse('geo:0,-180.0000001')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be greater than or equal to -180"
      `);
      expectResult(() => GeoURISchema.safeParse('geo:0,180.0000001')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be less than or equal to 180"
      `);
    });
  });

  describe(`when using the "${geoPoint.name}" helper`, () => {
    it(`then it should create a GeoPoint from a valid Geo URI`, () => {
      expect(geoPoint('geo:42.42,-42.42')).toMatchInlineSnapshot(`
        {
          "lat": 42.42,
          "lng": -42.42,
        }
      `);
    });
  });

  describe(`when using the "${geoUri.name}" helper`, () => {
    it('then it should throw if the latitude is out of range', () => {
      expect(() => geoUri({ lat: -90.0000001, lng: 0 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be greater than or equal to -90"
      `);
      expect(() => geoUri({ lat: 90.0000001, lng: 0 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be less than or equal to 90"
      `);
    });

    it('then it should throw if the longitude is out of range', () => {
      expect(() => geoUri({ lat: 0, lng: -180.0000001 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be greater than or equal to -180"
      `);
      expect(() => geoUri({ lat: 0, lng: 180.0000001 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be less than or equal to 180"
      `);
    });

    it(`then it should return a valid Geo URI`, () => {
      expect(geoUri({ lat: 42.42, lng: -42.42 })).toMatchInlineSnapshot(`"geo:42.42,-42.42"`);
    });
  });
});
