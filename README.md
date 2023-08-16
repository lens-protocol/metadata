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
