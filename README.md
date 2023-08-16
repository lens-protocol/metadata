# Lens Protocol Metadata Standards

This repository contains the utilities and TS types for Lens Protocol Metadata Standards.

## Features

- [Zod](https://zod.dev/) schema definitions
- [JSON Schema](https://json-schema.org/) definitions
- TypeScript type definitions

## Installation

```bash
# npm:
npm install zod @lens-protocol/metadata

# yarn:
yarn add zod @lens-protocol/metadata

# pnpm:
pnpm add zod @lens-protocol/metadata
```

> [!NOTE]  
> `zod` is marked as optional peer dependency, so if you all you need is the JSON schema definitions, you can install `@lens-protocol/metadata` without `zod`.

## Usage

```typescript
import { PublicationMetadataSchema } from '@lens-protocol/metadata';

const valid = {
  /** example of valid publication metadata **/
};
const invalid = {
  /** example of invalid publication metadata **/
};

PublicationMetadataSchema.parse(valid); // => PublicationMetadata
PublicationMetadataSchema.parse(invalid); // => throws ZodError

// OR

PublicationMetadataSchema.safeParse(valid);
// => { success: true, data: PublicationMetadata }
PublicationMetadataSchema.safeParse(invalid);
// => { success: false, error: ZodError }
```

Narrowing types:

```typescript
import { PublicationMetadata, PublicationMetadataSchema, SchemaId } from '@lens-protocol/metadata';

const publicationMetadata = PublicationMetadataSchema.parse(valid);

switch (publicationMetadata.$schema) {
  case SchemaId.ARTICLE:
    // publicationMetadata is ArticleMetadata
    break;
  case SchemaId.AUDIO:
    // publicationMetadata is AudioMetadata
    break;
  case SchemaId.IMAGE:
    // publicationMetadata is ImageMetadata
    break;
  case SchemaId.TEXT_ONLY:
    // publicationMetadata is TextOnlyMetadata
    break;

  // ...
}
```

Importing JSON schema:

```typescript
import audio from '@lens-protocol/metadata/jsonschemas/audio/1-0-0.json' assert { type: 'json' };

import embed from '@lens-protocol/metadata/jsonschemas/embed/1-0-0.json' assert { type: 'json' };
```

## Contributing

To contribute to the Lens Protocol Metadata Standards, please fork this repository and submit a pull request with your changes.

To build the project, run:

```bash
pnpm build
```

Add change

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

Lens Protocol Metadata Standard is [MIT licensed](./LICENSE)

## Support

See the Lens API and SDK channel on our [Discord](https://discord.gg/lensprotocol)
