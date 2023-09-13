import { describe, expect, it } from '@jest/globals';

import { expectSchema } from '../__helpers__/assertions.js';
import { GeoURISchema, datetimeSchema, geoPoint, geoUri } from '../primitives.js';

describe(`Given the primitives schemas`, () => {
  describe(`when parsing a datetime value`, () => {
    it(`then should support ISO 8601 UTC datetime strings`, () => {
      expectSchema(() =>
        datetimeSchema('not used').safeParse('2023-05-16T18:43:35Z'),
      ).toMatchInlineSnapshot(`"2023-05-16T18:43:35Z"`);
    });
  });

  describe(`when parsing a Geo URI value`, () => {
    it(`then should ensure it's a Geo URI in the the 'geo:lat,lng' format`, () => {
      expectSchema(() => GeoURISchema.safeParse(' ')).toMatchInlineSnapshot(`
        "fix the following issues
        Should be a Geo URI. Expected \`geo:lat,lng\`."
      `);
    });

    it(`then should ensure it's within the expected coordinate limits`, () => {
      expectSchema(() => GeoURISchema.safeParse('geo:-90.0000001,0')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be greater than or equal to -90"
      `);
      expectSchema(() => GeoURISchema.safeParse('geo:90.0000001,0')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be less than or equal to 90"
      `);
      expectSchema(() => GeoURISchema.safeParse('geo:0,-180.0000001')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be greater than or equal to -180"
      `);
      expectSchema(() => GeoURISchema.safeParse('geo:0,180.0000001')).toMatchInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be less than or equal to 180"
      `);
    });
  });

  describe(`when using the "${geoPoint.name}" helper`, () => {
    it(`then should create a GeoPoint from a valid Geo URI`, () => {
      expect(geoPoint('geo:42.42,-42.42')).toMatchInlineSnapshot(`
        {
          "lat": 42.42,
          "lng": -42.42,
        }
      `);
    });
  });

  describe(`when using the "${geoUri.name}" helper`, () => {
    it('then should throw if the latitude is out of range', () => {
      expect(() => geoUri({ lat: -90.0000001, lng: 0 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be greater than or equal to -90"
      `);
      expect(() => geoUri({ lat: 90.0000001, lng: 0 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lat": Number must be less than or equal to 90"
      `);
    });

    it('then should throw if the longitude is out of range', () => {
      expect(() => geoUri({ lat: 0, lng: -180.0000001 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be greater than or equal to -180"
      `);
      expect(() => geoUri({ lat: 0, lng: 180.0000001 })).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "lng": Number must be less than or equal to 180"
      `);
    });

    it(`then should return a valid Geo URI`, () => {
      expect(geoUri({ lat: 42.42, lng: -42.42 })).toMatchInlineSnapshot(`"geo:42.42,-42.42"`);
    });
  });
});
