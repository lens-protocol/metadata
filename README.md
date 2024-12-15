# Lens Protocol Metadata Standards

Schema validation and TS types for [LIP-2](https://github.com/lens-protocol/LIPs/pull/5/) Lens Protocol Metadata Standards.

- [Features](#features)
- [Installation](#installation)
- [Documentation](#documentation)
  - [Compose](#compose)
    - [Post metadata](#post-metadata)
    - [Account metadata](#account-metadata)
  - [Parse](#parse)
    - [Post metadata](#post-metadata-1)
    - [Account metadata](#account-metadata-1)
  - [Extract version number](#extract-version-number)
  - [Format validation error](#format-validation-error)
- [Types](#types)
  - [Narrowing types](#narrowing-types)
    - [`PostMetadata`](#postmetadata)
    - [`AccessCondition`](#accesscondition)
    - [`MetadataAttribute`](#metadataattribute)
  - [Other useful types](#other-useful-types)
- [Legacy metadata formats](#legacy-metadata-formats)
- [JSON schemas](#json-schemas)
- [Versioning](#versioning)
  - [Adding a new schema](#adding-a-new-schema)
- [Contributing](#contributing)
- [Releasing](#releasing)
- [License](#license)
- [Support](#support)

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
> `zod` is marked as optional peer dependency, so if all you need is the JSON Schema definitions, you can install `@lens-protocol/metadata` without `zod`.

## Documentation

See [https://lens-protocol.github.io/metadata/](https://lens-protocol.github.io/metadata/).

### Compose

#### Post metadata

You can create compliant `PostMetadata` objects via the following builder functions:

```ts
import {
  article,
  audio,
  checkingIn,
  embed,
  event,
  image,
  link,
  livestream,
  mint,
  space,
  story,
  textOnly,
  threeD,
  transaction,
  video,
} from '@lens-protocol/metadata';

const json = article({
  content: 'The content of the article',
});
```

> [!NOTE]
> Use the type definitions to explore the available properties and their types. The builders will throw a `ValidationError` with instructions on how to fix the error if the object is not compliant with the schema.

We also provided a set of builder function for specific metadata sub-types (list to be expanded):

```ts
import { geoUri } from '@lens-protocol/metadata';

const uri = geoUri({
  lat: 51.5074,
  lng: 0.1278,
});
```

#### Account metadata

You can create compliant `AccountMetadata` objects via the following builder function:

```ts
import { account } from '@lens-protocol/metadata';

const json = account({
  name: 'Bob',

  bio: 'I am a Lens user',
});
```

> [!NOTE]
> Use the type definitions to explore the available properties and their types. The builder will throw a `ValidationError` with instructions on how to fix the error if the object is not compliant with the schema.

### Parse

Assuming we have 2 JS objects:

```ts
const valid = {
  /** example of valid metadata **/
};
const invalid = {
  /** example of invalid metadata **/
};
```

#### Post metadata

Post metadata schema is a union of all _content_ schemas (e.g. `ArticleMetadata`, `AudioMetadata`, etc.).

Use it to parse the metadata referenced by `contentURI` of Lens Post.

```ts
import { PostMetadataSchema } from '@lens-protocol/metadata';

PostMetadataSchema.parse(valid); // => PostMetadata
PostMetadataSchema.parse(invalid); // => throws ZodError

// OR

PostMetadataSchema.safeParse(valid);
// => { success: true, data: PostMetadata }
PostMetadataSchema.safeParse(invalid);
// => { success: false, error: ZodError }
```

#### Account metadata

```ts
import { AccountMetadataSchema } from '@lens-protocol/metadata';

AccountMetadataSchema.parse(valid); // => AccountMetadata
AccountMetadataSchema.parse(invalid); // => throws ZodError

// OR

AccountMetadataSchema.safeParse(valid);
// => { success: true, data: AccountMetadata }
AccountMetadataSchema.safeParse(invalid);
// => { success: false, error: ZodError }
```

### Extract version number

A convenience `extractVersion` function is available to extract the version from a parsed `PublicationMetadata` or `ProfileMetadata`.

```ts
import { extractVersion, PostMetadataSchema, AccountMetadataSchema } from '@lens-protocol/metadata';

const postMetadata = PostMetadataSchema.parse(valid);

extractVersion(postMetadata); // => '3.0.0'

const accountMetadata = AccountMetadataSchema.parse(valid);

extractVersion(accountMetadata); // => '1.0.0'
```

### Format validation error

`ZodError` contains all the information needed to inform you about the validation error, but it's not very user friendly. You can use `formatZodError` to get a more readable error message.

```ts
import { PostMetadataSchema, formatZodError } from '@lens-protocol/metadata';

const result = PostMetadataSchema.safeParse(invalid);

if (!result.success) {
  console.log(formatZodError(result.error));
}
```

## Types

### Narrowing types

Every time you have a discriminated union, you can use the discriminant to narrow the type. See a few examples below.

#### `PostMetadata`

```ts
import { PostMetadata, PostMetadataSchema, PostSchemaId } from '@lens-protocol/metadata';

const metadata = PostMetadataSchema.parse(valid);

switch (metadata.$schema) {
  case PostSchemaId.ARTICLE_LATEST:
    // metadata is ArticleMetadata
    break;
  case PostSchemaId.AUDIO_LATEST:
    // metadata is AudioMetadata
    break;
  case PostSchemaId.IMAGE_LATEST:
    // metadata is ImageMetadata
    break;
  case PostSchemaId.TEXT_ONLY_LATEST:
    // metadata is TextOnlyMetadata
    break;

  // ...
}
```

#### `AccessCondition`

```ts
import { AccessCondition, ConditionType, PostMetadataSchema } from '@lens-protocol/metadata';

const metadata = PostMetadataSchema.parse(valid);

switch (metadata.encryptedWith?.accessCondition.type) {
  case ConditionType.AND:
    // accessCondition is AndCondition
    break;
  case ConditionType.OR:
    // accessCondition is OrCondition
    break;
  case ConditionType.NFT_OWNERSHIP:
    // accessCondition is NftOwnershipCondition
    break;
  case ConditionType.EOA_OWNERSHIP:
    // accessCondition is EoaOwnershipCondition
    break;

  // ...
}
```

#### `MetadataAttribute`

```ts
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

### Other useful types

The package also exports all enums and types that you might need to work with the metadata.

Use your IDE's autocomplete to explore the available types.

Some examples:

```ts
import {
  // enums
  MediaAudioKind,
  MediaAudioMimeType,
  MediaImageMimeType,
  MediaVideoMimeType,
  MetadataAttributeType,
  PostMainFocus,
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

## Legacy metadata formats

The package also exports parsers for legacy metadata formats via the `@lens-protocol/metadata/legacy` entrypoint.

> [!WARNING]
> DO NOT mix and match legacy and new metadata TS types and enums. Although they share some similarities they are not meant to be interoperable.
> For example if you are checking `mainContentFocus` of `PublicationMetadataV2` use the `PublicationMainFocus` exported from `@lens-protocol/metadata/legacy` and NOT the one from the main `@lens-protocol/metadata` entrypoint.

You can parse legacy Publication Metadata v1 and v2 via:

```ts
import { PublicationMetadataSchema } from '@lens-protocol/metadata/legacy';

PublicationMetadataSchema.parse(valid); // => PublicationMetadata
PublicationMetadataSchema.parse(invalid); // => throws ZodError

// OR

PublicationMetadataSchema.safeParse(valid);
// => { success: true, data: PublicationMetadata }
PublicationMetadataSchema.safeParse(invalid);
// => { success: false, error: ZodError }
```

Legacy `PublicationMetadata` is a discriminated union of `PublicationMetadataV1` and `PublicationMetadataV2` where the `version` property is the discriminant.

In turn `legacy.PublicationMetadataV2` is a discriminated union of:

- `PublicationMetadataV2Article`
- `PublicationMetadataV2Audio`
- `PublicationMetadataV2Embed`
- `PublicationMetadataV2Image`
- `PublicationMetadataV2Link`
- `PublicationMetadataV2TextOnly`
- `PublicationMetadataV2Video`

where the `mainContentFocus` property is the discriminant.

```ts
import {
  PublicationMetadataSchema,
  PublicationMetadataVersion,
  PublicationMainFocus,
} from '@lens-protocol/metadata/legacy';

const publicationMetadata = PublicationMetadataSchema.parse(valid);

switch (publicationMetadata.version) {
  case PublicationMetadataVersion.V1:
    // publicationMetadata is PublicationMetadataV1
    break;
  case PublicationMetadataVersion.V2:
    // publicationMetadata is PublicationMetadataV2

    switch (publicationMetadata.mainContentFocus) {
      case PublicationMainFocus.ARTICLE:
        // publicationMetadata is PublicationMetadataV2Article
        break;
      case PublicationMainFocus.VIDEO:
        // publicationMetadata is PublicationMetadataV2Video
        break;

      // ...
    }
    break;
}
```

You can also parse legacy Profile Metadata (aka v1) via:

```ts
import { ProfileMetadataSchema } from '@lens-protocol/metadata/legacy';

ProfileMetadataSchema.parse(valid); // => ProfileMetadata
ProfileMetadataSchema.parse(invalid); // => throws ZodError

// OR

ProfileMetadataSchema.safeParse(valid);
// => { success: true, data: ProfileMetadata }
ProfileMetadataSchema.safeParse(invalid);
// => { success: false, error: ZodError }
```

Similarly to the main entrypoint the `@lens-protocol/metadata/legacy` entrypoint also exports all the types and enums that you might need to work with the legacy metadata (some examples below).

```ts
import {
  // enums
  AudioMimeType,
  ImageMimeType,
  PublicationMainFocus,
  PublicationMetadataVersion,
  VideoMimeType,

  // main types
  ProfileMetadata,
  PublicationMetadata,
  PublicationMetadataV1,
  PublicationMetadataV2,
  PublicationMetadataV2Article,
  PublicationMetadataV2Audio,
  PublicationMetadataV2Embed,
  PublicationMetadataV2Image,
  PublicationMetadataV2Link,
  PublicationMetadataV2TextOnly,
  PublicationMetadataV2Video,

  // others
  AccessCondition,
  AndCondition,
  CollectCondition,
  EncryptedFields,
  EncryptedMedia,
  EoaOwnership,
  Erc20Ownership,
  FollowCondition,
  MarketplaceMetadata,
  MarketplaceMetadataAttribute,
  Media,
  NftOwnership,
  OrCondition,
  ProfileMetadataAttribute,
  ProfileOwnership,

  // branded aliases
  Locale,
  Markdown,
  Signature,
  URI,
  AppId,
  Datetime,
} from '@lens-protocol/metadata/legacy';
```

> [!NOTE]
> If you find yourself in a position of importing from both `@lens-protocol/metadata` and `@lens-protocol/metadata/legacy` entrypoints in the same module. You can use ESModule aliasing to avoid conflicts: `import * as legacy from '@lens-protocol/metadata/legacy'` and then use the legacy types, enums, and parsers under `legacy.*`.

## JSON schemas

Importing JSON schema in TypeScript is a simple as:

```ts
import audio from '@lens-protocol/metadata/jsonschemas/post/audio/3.0.0.json' assert { type: 'json' };

import audio from '@lens-protocol/metadata/jsonschemas/post/article/3.0.0.json' assert { type: 'json' };

import mirror from '@lens-protocol/metadata/jsonschemas/post/mirror/1.0.0.json' assert { type: 'json' };

import profile from '@lens-protocol/metadata/jsonschemas/account/1.0.0.json' assert { type: 'json' };
```

You can the use them in your JSON Schema validator of choice, for example [ajv](https://ajv.js.org/).

## Versioning

The Lens Protocol Metadata Standards use a **self-describing JSON format**. All metadata files that adopt this standard MUST have a `$schema` property that identifies the schema the file conforms to.

```json
{
  "$schema": "https://json-schemas.lens.dev/post/article/3.0.0.json",

  "lens": {
    "id": "b3d7f1a0-1f75-11ec-9621-0242ac130002",
    "content": "The content of the article",
    "locale": "en"
  }
}
```

The `$schema` property is a URI that identify the schema type and its version.

**Schemas are versioned using [Semantic Versioning](https://semver.org/)**.

> [!NOTE]  
> Even though schemas are identified by URIs, those identifiers are not necessarily network-addressable. They are just identifiers.
> Generally, JSON schema validators don’t make HTTP requests (`https://`) to fetch schemas. Instead, they provide a way to load schemas into an internal schema database. When a schema is referenced by its URI identifier, the schema is retrieved from the internal schema database.

Future changes should aim to be backwards compatible as much as possible.

When adding a new version of a schema, the previous version should be kept for a reasonable amount of time to allow consumers to migrate and to support the new specification.

### Adding a new schema

In this example we will add a new version of the `AudioSchema` schema, but the same process applies to all the other schemas.

- create a new `PostSchemaId` enum entry with value of `PostSchemaId.AUDIO_LATEST`. Name it after the current schema version (e.g. `AUDIO_V1_0_0`).
- rename the existing `AudioSchema` into `AudioV1_0_0Schema` and update the `$schema` value to `PostSchemaId.AUDIO_V1_0_0`
- increase the version number of the `PostSchemaId.AUDIO_LATEST` based on the nature of your changes. **Remember to follow semver rules.**
- create a new `AudioSchema` with the new schema definition and use the `PostSchemaId.AUDIO_LATEST` as `$schema` value
- update the `scripts/build.ts` script to include the new schema and old schema files under the correct version file name in the `jsonschemas/post/audio` folder
- release a new version of this package according to the nature of the changes (new major version of a schema = new major version of the package, etc.)

In case the changes are backwards compatible, you could create a single `AudioMetadataDetailsSchema` definition and just declare 2 schemas out of it, one for the old version and one for the new version. For example:

```ts
export const AudioMetadataDetailsSchema = metadataDetailsWith({
  mainContentFocus: mainContentFocus(PostMainFocus.AUDIO),

  audio: MediaAudioSchema,

  attachments: AnyMediaSchema.array()
    .min(1)
    .optional()
    .describe('The other attachments you want to include with it.'),

  /** e.g. new optional fields */
});
export type AudioMetadataDetails = z.infer<typeof AudioMetadataDetailsSchema>;

export const AudioSchema = postWith({
  $schema: z.literal(PostSchemaId.AUDIO_LATEST),
  lens: AudioMetadataDetailsSchema,
});
export type AudioMetadata = z.infer<typeof AudioSchema>;

export const AudioV1Schema = postWith({
  $schema: z.literal(PostSchemaId.AUDIO_V1_0_0),
  lens: AudioMetadataDetailsSchema,
});
export type AudioV1Metadata = z.infer<typeof AudioV1Schema>;
```

In this case consumers of this package can take advantage of the structural likeness and just do the following:

```ts
switch (metadata.$schema) {
  case PostSchemaId.AUDIO_V1_0_0:
  case PostSchemaId.AUDIO_LATEST:
    // metadata.lens is AudioMetadataDetails
    break;
  // ...
}
```

## Contributing

To contribute to the Lens Protocol Metadata Standards, please fork this repository and submit a pull request with your changes.

To run the unit tests, run:

```bash
pnpm test
```

**Pro-tip:** you can run `pnpm test --watch` to run the tests in watch mode.

To build the project, run:

```bash
pnpm build
```

Generate and include up to date documentation with:

```bash
pnpm typedoc:docs
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
pnpm install && pnpm build && pnpm typedoc:docs
```

3. Update relevant `package.json`'s versions and update `CHANGELOG.md` with:

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
