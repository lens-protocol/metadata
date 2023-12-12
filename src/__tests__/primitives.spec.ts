import { describe, expect, it } from '@jest/globals';
import { z } from 'zod';

import { expectResult } from '../__helpers__/assertions.js';
import {
  GeoURISchema,
  datetimeSchema,
  geoPoint,
  geoUri,
  LocaleSchema,
  nonEmpty,
} from '../primitives.js';

describe(`Given the primitives schemas`, () => {
  describe(`when parsing a string with a schema defined with ${nonEmpty.name} modifier`, () => {
    const Schema = nonEmpty(z.string());

    it('then it should preprocess the string trimming all "whitespace" characters', () => {
      [
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#white_space
        '\u0009',
        '\u000B',
        '\u000C',
        '\u0020',
        '\u00A0',
        '\uFEFF',

        // https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5Cp%7BGeneral_Category%3DSpace_Separator%7D
        '\u1680',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200A',
        '\u202F',
        '\u205F',
        '\u3000',
      ].forEach((char) => {
        expect(Schema.parse(`${char}42${char}`)).toBe('42');
      });
    });

    it('then it should preprocess the string trimming all other invisible unicode characters', () => {
      [
        '\u0000', // null character
        '\u0007', // bell character
        '\u000E', // shift in
        '\u000F', // shift out

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#format-control_characters
        '\u200B', // zero width space
        '\u200C', // zero width non-joiner Unicode code point
        '\u200D', // zero width joiner Unicode code point
      ].forEach((char) => {
        expect(Schema.parse(`${char}42${char}`)).toBe('42');
      });
    });
  });

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
