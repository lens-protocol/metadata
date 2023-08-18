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

```typescript
import {
  PublicationMetadata,
  PublicationMetadataSchema,
  PublicationSchemaId,
} from '@lens-protocol/metadata';

const publicationMetadata = PublicationMetadataSchema.parse(valid);

switch (publicationMetadata.$schema) {
  case PublicationSchemaId.ARTICLE:
    // publicationMetadata is ArticleMetadata
    break;
  case PublicationSchemaId.AUDIO:
    // publicationMetadata is AudioMetadata
    break;
  case PublicationSchemaId.IMAGE:
    // publicationMetadata is ImageMetadata
    break;
  case PublicationSchemaId.TEXT_ONLY:
    // publicationMetadata is TextOnlyMetadata
    break;

  // ...
}
```

### Useful types

The package also exports all enums and types that you might need to work with the metadata.

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
import audio from '@lens-protocol/metadata/jsonschemas/audio/1-0-0.json' assert { type: 'json' };

import embed from '@lens-protocol/metadata/jsonschemas/embed/1-0-0.json' assert { type: 'json' };
```

You can the use them in your JSON Schema validator of choice, for example [ajv](https://ajv.js.org/).

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
