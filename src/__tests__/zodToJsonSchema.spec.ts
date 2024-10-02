import { describe, expect, it } from '@jest/globals';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { MetadataAttributeSchema } from '../MetadataAttribute';
import { MarketplaceMetadataSchema } from '../marketplace';
import { EncryptedStringSchema } from '../primitives';
import { AnyMediaSchema } from '../publication';

describe(`Given the zod-to-json-schema package`, () => {
  describe('when converting a schema that uses AnyMediaSchema', () => {
    it('should avoid to cross reference media attributes but use shared definitions', () => {
      const jsonSchema = zodToJsonSchema(AnyMediaSchema, {
        target: 'jsonSchema7',
        definitionPath: '$defs',
        definitions: {
          MetadataAttribute: MetadataAttributeSchema,
          EncryptedString: EncryptedStringSchema,
        },
      });

      expect(jsonSchema).toMatchInlineSnapshot(`
        {
          "$defs": {
            "EncryptedString": {
              "description": "An encrypted value.",
              "pattern": "^\\S+$",
              "type": "string",
            },
            "MetadataAttribute": {
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
          },
          "$schema": "http://json-schema.org/draft-07/schema#",
          "anyOf": [
            {
              "additionalProperties": false,
              "properties": {
                "artist": {
                  "anyOf": [
                    {
                      "description": "The name of the artist.",
                      "minLength": 1,
                      "type": "string",
                    },
                    {
                      "$ref": "#/$defs/EncryptedString",
                    },
                  ],
                  "description": "An encrypted value or its decrypted version.",
                },
                "attributes": {
                  "description": "A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.",
                  "items": {
                    "$ref": "#/$defs/MetadataAttribute",
                  },
                  "minItems": 1,
                  "type": "array",
                },
                "cover": {
                  "$ref": "#/anyOf/0/properties/item",
                },
                "credits": {
                  "anyOf": [
                    {
                      "description": "The credits for the audio.",
                      "minLength": 1,
                      "type": "string",
                    },
                    {
                      "$ref": "#/$defs/EncryptedString",
                    },
                  ],
                  "description": "An encrypted value or its decrypted version.",
                },
                "duration": {
                  "description": "How long the the audio is in seconds.",
                  "exclusiveMinimum": 0,
                  "type": "integer",
                },
                "genre": {
                  "anyOf": [
                    {
                      "description": "The genre of the audio",
                      "minLength": 1,
                      "type": "string",
                    },
                    {
                      "$ref": "#/$defs/EncryptedString",
                    },
                  ],
                  "description": "An encrypted value or its decrypted version.",
                },
                "item": {
                  "anyOf": [
                    {
                      "description": "A Uniform Resource Identifier. ",
                      "format": "uri",
                      "minLength": 6,
                      "type": "string",
                    },
                    {
                      "$ref": "#/$defs/EncryptedString",
                    },
                  ],
                  "description": "An encrypted value or its decrypted version.",
                },
                "kind": {
                  "description": "The type of audio.",
                  "enum": [
                    "MUSIC",
                    "PODCAST",
                    "AUDIOBOOK",
                    "VOICE_NOTE",
                    "SOUND",
                    "OTHER",
                  ],
                  "type": "string",
                },
                "license": {
                  "description": "The license for the audio.",
                  "enum": [
                    "CCO",
                    "CC BY",
                    "CC BY-ND",
                    "CC BY-NC",
                    "TBNL-C-D-PL-Legal",
                    "TBNL-C-DT-PL-Legal",
                    "TBNL-C-ND-PL-Legal",
                    "TBNL-C-D-NPL-Legal",
                    "TBNL-C-DT-NPL-Legal",
                    "TBNL-C-DTSA-PL-Legal",
                    "TBNL-C-DTSA-NPL-Legal",
                    "TBNL-C-ND-NPL-Legal",
                    "TBNL-C-D-PL-Ledger",
                    "TBNL-C-DT-PL-Ledger",
                    "TBNL-C-ND-PL-Ledger",
                    "TBNL-C-D-NPL-Ledger",
                    "TBNL-C-DT-NPL-Ledger",
                    "TBNL-C-DTSA-PL-Ledger",
                    "TBNL-C-DTSA-NPL-Ledger",
                    "TBNL-C-ND-NPL-Ledger",
                    "TBNL-NC-D-PL-Legal",
                    "TBNL-NC-DT-PL-Legal",
                    "TBNL-NC-ND-PL-Legal",
                    "TBNL-NC-D-NPL-Legal",
                    "TBNL-NC-DT-NPL-Legal",
                    "TBNL-NC-DTSA-PL-Legal",
                    "TBNL-NC-DTSA-NPL-Legal",
                    "TBNL-NC-ND-NPL-Legal",
                    "TBNL-NC-D-PL-Ledger",
                    "TBNL-NC-DT-PL-Ledger",
                    "TBNL-NC-ND-PL-Ledger",
                    "TBNL-NC-D-NPL-Ledger",
                    "TBNL-NC-DT-NPL-Ledger",
                    "TBNL-NC-DTSA-PL-Ledger",
                    "TBNL-NC-DTSA-NPL-Ledger",
                    "TBNL-NC-ND-NPL-Ledger",
                  ],
                  "type": "string",
                },
                "lyrics": {
                  "$ref": "#/anyOf/0/properties/item",
                },
                "recordLabel": {
                  "anyOf": [
                    {
                      "description": "The record label for the audio.",
                      "minLength": 1,
                      "type": "string",
                    },
                    {
                      "$ref": "#/$defs/EncryptedString",
                    },
                  ],
                  "description": "An encrypted value or its decrypted version.",
                },
                "type": {
                  "description": "The mime type of the audio file.",
                  "enum": [
                    "audio/wav",
                    "audio/vnd.wave",
                    "audio/mpeg",
                    "audio/ogg",
                    "audio/mp4",
                    "audio/aac",
                    "audio/webm",
                    "audio/flac",
                  ],
                  "type": "string",
                },
              },
              "required": [
                "item",
                "type",
              ],
              "type": "object",
            },
            {
              "additionalProperties": false,
              "properties": {
                "altTag": {
                  "anyOf": [
                    {
                      "description": "The alt tag for accessibility",
                      "minLength": 1,
                      "type": "string",
                    },
                    {
                      "$ref": "#/$defs/EncryptedString",
                    },
                  ],
                  "description": "An encrypted value or its decrypted version.",
                },
                "attributes": {
                  "description": "A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.",
                  "items": {
                    "$ref": "#/$defs/MetadataAttribute",
                  },
                  "minItems": 1,
                  "type": "array",
                },
                "item": {
                  "$ref": "#/anyOf/0/properties/item",
                },
                "license": {
                  "$ref": "#/anyOf/0/properties/license",
                  "description": "The license for the image",
                },
                "type": {
                  "description": "The mime type of the image",
                  "enum": [
                    "image/bmp",
                    "image/gif",
                    "image/heic",
                    "image/jpeg",
                    "image/png",
                    "image/svg+xml",
                    "image/tiff",
                    "image/webp",
                    "image/x-ms-bmp",
                  ],
                  "type": "string",
                },
              },
              "required": [
                "item",
                "type",
              ],
              "type": "object",
            },
            {
              "additionalProperties": false,
              "properties": {
                "altTag": {
                  "anyOf": [
                    {
                      "description": "The alt tag for accessibility",
                      "minLength": 1,
                      "type": "string",
                    },
                    {
                      "$ref": "#/$defs/EncryptedString",
                    },
                  ],
                  "description": "An encrypted value or its decrypted version.",
                },
                "attributes": {
                  "description": "A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.",
                  "items": {
                    "$ref": "#/$defs/MetadataAttribute",
                  },
                  "minItems": 1,
                  "type": "array",
                },
                "cover": {
                  "$ref": "#/anyOf/0/properties/item",
                },
                "duration": {
                  "description": "How long the the video is in seconds",
                  "exclusiveMinimum": 0,
                  "type": "integer",
                },
                "item": {
                  "$ref": "#/anyOf/0/properties/item",
                },
                "license": {
                  "$ref": "#/anyOf/0/properties/license",
                  "description": "The license for the video",
                },
                "type": {
                  "description": "The mime type of the video",
                  "enum": [
                    "model/gltf+json",
                    "model/gltf-binary",
                    "video/x-m4v",
                    "video/mov",
                    "video/mp4",
                    "video/mpeg",
                    "video/ogg",
                    "video/ogv",
                    "video/quicktime",
                    "video/webm",
                  ],
                  "type": "string",
                },
              },
              "required": [
                "item",
                "type",
              ],
              "type": "object",
            },
          ],
        }
      `);
    });
  });

  describe('when converting MarketplaceMetadataSchema', () => {
    it('should avoid the odd extra `anyOf` with `not: {}` option', () => {
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
