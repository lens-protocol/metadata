# Lens Protocol Metadata Standards

Schema vaidation and TS types for [LIP-2](https://github.com/lens-protocol/LIPs/pull/5/) Lens Protocol Metadata Standards.

## Features

- [Zod](https://zod.dev/) schema definitions
- [JSON Schema](https://json-schema.org/) definitions
- TypeScript type definitions

## Installation

```bash
# npm:
npm install @lens-protocol/metadata zod

# yarn:
yarn add @lens-protocol/metadata zod

# pnpm:
pnpm add @lens-protocol/metadata zod
```

> [!NOTE]  
> `zod` is marked as optional peer dependency, so if you all you need is the JSON Schema definitions, you can install `@lens-protocol/metadata` without `zod`.

## Usage

Assuming we have 2 JS objects:

```typescript
const valid = {
  /** example of valid metadata **/
};
const invalid = {
  /** example of invalid metadata **/
};
```

### Publication metadata

```typescript
import { PublicationMetadataSchema } from '@lens-protocol/metadata';

PublicationMetadataSchema.parse(valid); // => PublicationMetadata
PublicationMetadataSchema.parse(invalid); // => throws ZodError

// OR

PublicationMetadataSchema.safeParse(valid);
// => { success: true, data: PublicationMetadata }
PublicationMetadataSchema.safeParse(invalid);
// => { success: false, error: ZodError }
```

### Profile metadata

```typescript
import { ProfileMetadataSchema } from '@lens-protocol/metadata';

ProfileMetadataSchema.parse(valid); // => ProfileMetadata
ProfileMetadataSchema.parse(invalid); // => throws ZodError

// OR

ProfileMetadataSchema.safeParse(valid);
// => { success: true, data: ProfileMetadata }
ProfileMetadataSchema.safeParse(invalid);
// => { success: false, error: ZodError }
```

### Format validation error

`ZodError` contains all the information needed to inform you about the validation error, but it's not very user friendly. You can use `formatZodError` to get a more readable error message.

```typescript
import { PublicationMetadataSchema, formatZodError } from '@lens-protocol/metadata';

const result = PublicationMetadataSchema.safeParse(invalid);

if (!result.success) {
  console.log(formatZodError(result.error));
}
```

### Narrowing types

Every time you have a discriminated union, you can use the discriminant to narrow the type. See few examples below.

**PublicationMetadata**

```typescript
import {
  PublicationMetadata,
  PublicationMetadataSchema,
  PublicationSchemaId,
} from '@lens-protocol/metadata';

const publicationMetadata = PublicationMetadataSchema.parse(valid);

switch (publicationMetadata.$schema) {
  case PublicationSchemaId.ARTICLE_LATEST:
    // publicationMetadata is ArticleMetadata
    break;
  case PublicationSchemaId.AUDIO_LATEST:
    // publicationMetadata is AudioMetadata
    break;
  case PublicationSchemaId.IMAGE_LATEST:
    // publicationMetadata is ImageMetadata
    break;
  case PublicationSchemaId.TEXT_ONLY_LATEST:
    // publicationMetadata is TextOnlyMetadata
    break;

  // ...
}
```

**MetadataAttribute**

```typescript
import { MetadataAttribute, MetadataAttributeType } from '@lens-protocol/metadata';

switch (attribute.type) {
  case MetadataAttributeType.BOOLEAN:
    // attribute is BooleanAttribute
    // value is a string "true" or "false"
    break;
  case MetadataAttributeType.DATE:
    // attribute is DateAttribute
    // value is a string in ISO 8601 format
    break;
  case MetadataAttributeType.NUMBER:
    // attribute is NumberAttribute
    // value is a string containing a valid JS number
    break;
  case MetadataAttributeType.STRING:
    // attribute is StringAttribute
    // value is a string
    break;
  case MetadataAttributeType.JSON:
    // attribute is JSONAttribute
    // value is a string allegedly containing a valid JSON, consumers should validate it
    break;
}
```

### Useful types

The package also exports all enums and types that you might need to work with the metadata.

Use your IDE's autocomplete to explore the available types.

Some examples:

```typescript
import {
  // enums
  MediaAudioKind,
  MediaAudioMimeType,
  MediaImageMimeType,
  MediaVideoMimeType,
  MetadataAttributeType
  PublicationMainFocus,
  ThreeDFormat,

  // main types
  ArticleMetadata,
  AudioMetadata,
  CheckingInMetadata,
  EmbedMetadata,
  EventMetadata,
  ImageMetadata,
  LinkMetadata,
  LivestreamMetadata,
  MintMetadata,
  ProfileMetadata,
  PublicationMetadata,
  SpaceMetadata,
  StoryMetadata,
  TextOnlyMetadata,
  ThreeDMetadata,
  TransactionMetadata,
  VideoMetadata,

  // others
  MetadataAttribute,
  MediaAudio,
  MediaImage,
  MediaVideo,
  AnyMedia,
  GeoLocation,
  BooleanAttribute,
  DateAttribute,
  NumberAttribute,
  StringAttribute,
  JSONAttribute,

  // branded aliases
  Locale,
  Markdown,
  Signature,
  URI,
  AppId,
  Datetime,
} from '@lens-protocol/metadata';
```

## JSON schemas

Importing JSON schema in TypeScript is a simple as:

```typescript
import audio from '@lens-protocol/metadata/jsonschemas/publications/audio/1.0.0.json' assert { type: 'json' };

import audio from '@lens-protocol/metadata/jsonschemas/publications/article/1.0.0.json' assert { type: 'json' };

import embed from '@lens-protocol/metadata/jsonschemas/profile/1.0.0.json' assert { type: 'json' };
```

You can the use them in your JSON Schema validator of choice, for example [ajv](https://ajv.js.org/).

## Versioning schemas

The Lens Protocol Metadata Standards use a **self-describing JSON format**. All metadata files that adopt this standard MUST have a `$schema` property that identifies the schema the file conforms to.

```json
{
  "$schema": "https://json-schemas.lens.dev/publications/article/1.0.0.json",

  "lens": {
    /* ... */
  }
}
```

The `$schema` property is a URI that identify the scheme type and its version.

> [!NOTE]  
> Even though schemas are identified by URIs, those identifiers are not necessarily network-addressable. They are just identifiers.
> Generally, JSON schema validators don’t make HTTP requests (`https://`) to fetch schemas. Instead, they provide a way to load schemas into an internal schema database. When a schema is referenced by it’s URI identifier, the schema is retrieved from the internal schema database.

**Schemas are versioned using [Semantic Versioning](https://semver.org/)**.

Future changes should aim to be backwards compatible as much as possible.

In case of minor or patch changes amend the implementation of the affected schema and update its version number accordingly.

In case of breaking changes, a new major version should be implemented. The previous version should be kept for a reasonable amount of time to allow consumers to migrate and to support existing publications.

In the case of a major version is needed proceed as follows:

- rename the current schema adding a `V<number` suffix (e.g. `AudioSchema` into `AudioSchemaV1`)
- rename the current Schema Id into something like `PublicationSchemaId.AUDIO_V1`
- create a new `PublicationSchemaId.AUDIO_LATEST` with the new version
- create a new `AudioSchema` with the new schema definition and the new schema id
- amend the JSON Schema `scripts/build.ts` script to generate old and new schema files
- release a new major version of this package

## Contributing

To contribute to the Lens Protocol Metadata Standards, please fork this repository and submit a pull request with your changes.

To build the project, run:

```bash
pnpm build
```

Add changeset with:

```bash
pnpm changeset add
```

Use [keepachangelog](https://keepachangelog.com/en/1.0.0/) format for the changeset message.

## Releasing

Release flow is managed by [changesets](https://github.com/changesets/changesets).

To release a new version follow the steps below:

1. Create a new branch from `main` with the name `release/<version>`
2. Build the project

```bash
pnpm install && pnpm build
```

3. Update relevant `package.json`'s versions and update `CHANGELOG.md` for each package:

```bash
pnpm changeset version
```

4. Review, commit and push the changes
5. Create a PR from `release/<version>` to `main`
6. Once approved, publish with (you need to be logged in to npm authorized to publish under `@lens-protocol`):

```bash
pnpm changeset publish
```

7. Push the tags

```bash
git push origin release/<version> --follow-tags
```

8. Merge the PR with a merge commit

## License

Lens Protocol Metadata Standards is [MIT licensed](./LICENSE)

## Support

See the Lens API and SDK channel on our [Discord](https://discord.gg/lensprotocol)
