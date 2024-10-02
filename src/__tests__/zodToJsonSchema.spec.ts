import { describe, expect, it } from '@jest/globals';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { MarketplaceMetadataSchema } from '../marketplace';
import { MediaAttributesSchema } from '../publication';

describe(`Given the zod-to-json-schema package`, () => {
  describe('when converting MediaAttributesSchema', () => {
    it('should avoid the odd extra `anyOf` with `not: {}` option', async () => {
      const jsonSchema = zodToJsonSchema(MediaAttributesSchema, {
        target: 'jsonSchema7',
        definitionPath: '$defs',
      });

      expect(jsonSchema).toMatchInlineSnapshot(`
        {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "description": "A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.",
          "items": {
            "anyOf": [
              {
                "additionalProperties": false,
                "properties": {
                  "key": {
                    "description": "The attribute's unique identifier.",
                    "minLength": 1,
                    "type": "string",
                  },
                  "type": {
                    "const": "Boolean",
                    "type": "string",
                  },
                  "value": {
                    "description": "A JS boolean value serialized as string. It's consumer responsibility to parse it.",
                    "enum": [
                      "true",
                      "false",
                    ],
                    "type": "string",
                  },
                },
                "required": [
                  "type",
                  "key",
                  "value",
                ],
                "type": "object",
              },
              {
                "additionalProperties": false,
                "properties": {
                  "key": {
                    "description": "The attribute's unique identifier.",
                    "minLength": 1,
                    "type": "string",
                  },
                  "type": {
                    "const": "Date",
                    "type": "string",
                  },
                  "value": {
                    "description": "A valid ISO 8601 date string.  It's consumer responsibility to parse it.",
                    "format": "date-time",
                    "type": "string",
                  },
                },
                "required": [
                  "type",
                  "key",
                  "value",
                ],
                "type": "object",
              },
              {
                "additionalProperties": false,
                "properties": {
                  "key": {
                    "description": "The attribute's unique identifier.",
                    "minLength": 1,
                    "type": "string",
                  },
                  "type": {
                    "const": "Number",
                    "type": "string",
                  },
                  "value": {
                    "description": "A valid JS number serialized as string. It's consumer responsibility to parse it.",
                    "minLength": 1,
                    "type": "string",
                  },
                },
                "required": [
                  "type",
                  "key",
                  "value",
                ],
                "type": "object",
              },
              {
                "additionalProperties": false,
                "properties": {
                  "key": {
                    "description": "The attribute's unique identifier.",
                    "minLength": 1,
                    "type": "string",
                  },
                  "type": {
                    "const": "String",
                    "type": "string",
                  },
                  "value": {
                    "description": "A string value.",
                    "minLength": 1,
                    "type": "string",
                  },
                },
                "required": [
                  "type",
                  "key",
                  "value",
                ],
                "type": "object",
              },
              {
                "additionalProperties": false,
                "properties": {
                  "key": {
                    "description": "The attribute's unique identifier.",
                    "minLength": 1,
                    "type": "string",
                  },
                  "type": {
                    "const": "JSON",
                    "type": "string",
                  },
                  "value": {
                    "description": "A JSON string. It's consumer responsibility to validate and parse it.",
                    "minLength": 1,
                    "type": "string",
                  },
                },
                "required": [
                  "type",
                  "key",
                  "value",
                ],
                "type": "object",
              },
            ],
          },
          "minItems": 1,
          "type": "array",
        }
      `);
    });
  });

  describe('when converting MarketplaceMetadataSchema', () => {
    it('should avoid the odd extra `anyOf` with `not: {}` option', async () => {
      const jsonSchema = zodToJsonSchema(MarketplaceMetadataSchema, {
        target: 'jsonSchema7',
        definitionPath: '$defs',
      });

      expect(jsonSchema).toMatchInlineSnapshot(`
        {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "additionalProperties": true,
          "properties": {
            "animation_url": {
              "anyOf": [
                {
                  "description": "A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.",
                  "format": "uri",
                  "minLength": 6,
                  "type": "string",
                },
                {
                  "type": "null",
                },
              ],
              "description": "A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.",
            },
            "attributes": {
              "description": "These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.",
              "items": {
                "additionalProperties": true,
                "properties": {
                  "display_type": {
                    "enum": [
                      "number",
                      "string",
                      "date",
                    ],
                    "type": "string",
                  },
                  "trait_type": {
                    "description": "The name of the trait.",
                    "minLength": 1,
                    "type": "string",
                  },
                  "value": {
                    "type": [
                      "string",
                      "number",
                    ],
                  },
                },
                "type": "object",
              },
              "type": "array",
            },
            "description": {
              "anyOf": [
                {
                  "description": "A human-readable description of the item. It could be plain text or markdown.",
                  "type": "string",
                },
                {
                  "type": "null",
                },
              ],
              "description": "A human-readable description of the item. It could be plain text or markdown.",
            },
            "external_url": {
              "anyOf": [
                {
                  "description": "This is the URL that will appear below the asset's image on OpenSea and others etc. and will allow users to leave OpenSea and view the item on the site.",
                  "format": "uri",
                  "minLength": 6,
                  "type": "string",
                },
                {
                  "type": "null",
                },
              ],
              "description": "This is the URL that will appear below the asset's image on OpenSea and others etc. and will allow users to leave OpenSea and view the item on the site.",
            },
            "image": {
              "anyOf": [
                {
                  "description": "Marketplaces will store any NFT image here.",
                  "format": "uri",
                  "minLength": 6,
                  "type": "string",
                },
                {
                  "type": "null",
                },
              ],
              "description": "Marketplaces will store any NFT image here.",
            },
            "name": {
              "description": "Name of the NFT item.",
              "type": "string",
            },
          },
          "type": "object",
        }
      `);
    });
  });
});
