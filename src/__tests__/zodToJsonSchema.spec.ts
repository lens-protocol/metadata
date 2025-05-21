import { describe, expect, it } from 'vitest';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { MetadataAttributeSchema } from '../MetadataAttribute';
import { AnyMediaSchema } from '../post';
import { NonEmptyStringSchema, URISchema } from '../primitives';

describe('Given the zod-to-json-schema package', () => {
  describe('when converting a schema that uses AnyMediaSchema', () => {
    it('should avoid to cross reference media attributes but use shared definitions', () => {
      const jsonSchema = zodToJsonSchema(AnyMediaSchema, {
        target: 'jsonSchema7',
        definitionPath: '$defs',
        definitions: {
          NonEmptyString: NonEmptyStringSchema,
          MetadataAttribute: MetadataAttributeSchema,
          URI: URISchema,
        },
      });

      expect(jsonSchema).toMatchInlineSnapshot(`
        {
          "$defs": {
            "MetadataAttribute": {
              "anyOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "key": {
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "The attribute's unique identifier.",
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
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "The attribute's unique identifier.",
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
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "The attribute's unique identifier.",
                    },
                    "type": {
                      "const": "Number",
                      "type": "string",
                    },
                    "value": {
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "A valid JS number serialized as string. It's consumer responsibility to parse it.",
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
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "The attribute's unique identifier.",
                    },
                    "type": {
                      "const": "String",
                      "type": "string",
                    },
                    "value": {
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "Any string value.",
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
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "The attribute's unique identifier.",
                    },
                    "type": {
                      "const": "JSON",
                      "type": "string",
                    },
                    "value": {
                      "$ref": "#/$defs/NonEmptyString",
                      "description": "A JSON string. It's consumer responsibility to validate and parse it.",
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
            "NonEmptyString": {
              "minLength": 1,
              "type": "string",
            },
            "URI": {
              "description": "A Uniform Resource Identifier.",
              "format": "uri",
              "minLength": 6,
              "type": "string",
            },
          },
          "$schema": "http://json-schema.org/draft-07/schema#",
          "anyOf": [
            {
              "additionalProperties": false,
              "properties": {
                "artist": {
                  "$ref": "#/$defs/NonEmptyString",
                  "description": "The name of the artist.",
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
                  "$ref": "#/$defs/URI",
                  "description": "A Uniform Resource Identifier.",
                },
                "credits": {
                  "$ref": "#/$defs/NonEmptyString",
                  "description": "The credits for the audio.",
                },
                "duration": {
                  "description": "How long the the audio is in seconds.",
                  "exclusiveMinimum": 0,
                  "type": "integer",
                },
                "genre": {
                  "$ref": "#/$defs/NonEmptyString",
                  "description": "The genre of the audio",
                },
                "item": {
                  "$ref": "#/$defs/URI",
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
                  "$ref": "#/$defs/URI",
                  "description": "A Uniform Resource Identifier.",
                },
                "recordLabel": {
                  "$ref": "#/$defs/NonEmptyString",
                  "description": "The record label for the audio.",
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
                  "$ref": "#/$defs/NonEmptyString",
                  "description": "The alt tag for accessibility",
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
                  "$ref": "#/$defs/URI",
                },
                "license": {
                  "$ref": "#/anyOf/0/properties/license",
                  "description": "The license for the image",
                },
                "type": {
                  "description": "The mime type of the image",
                  "enum": [
                    "image/avif",
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
                  "$ref": "#/$defs/NonEmptyString",
                  "description": "The alt tag for accessibility",
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
                  "$ref": "#/$defs/URI",
                  "description": "A Uniform Resource Identifier.",
                },
                "duration": {
                  "description": "How long the the video is in seconds",
                  "exclusiveMinimum": 0,
                  "type": "integer",
                },
                "item": {
                  "$ref": "#/$defs/URI",
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
});
