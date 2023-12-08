import { faker } from '@faker-js/faker';

import {
  MirrorMetadata,
  MirrorMetadataSchema,
  MirrorSchemaId,
  PublicationMainFocus,
  PublicationSchemaId,
  TextOnlyMetadata,
  TextOnlySchema,
} from '../index.js';

export function mockTextOnlyMetadata(): TextOnlyMetadata {
  return TextOnlySchema.parse({
    $schema: PublicationSchemaId.TEXT_ONLY_LATEST,
    lens: {
      id: faker.string.uuid(),
      mainContentFocus: PublicationMainFocus.TEXT_ONLY,
      content: faker.lorem.sentence(),
      locale: 'en',
    },
  });
}

export function mockMirrorMetadata(): MirrorMetadata {
  return MirrorMetadataSchema.parse({
    $schema: MirrorSchemaId.LATEST,
    lens: {
      id: faker.string.uuid(),
      appId: faker.commerce.productName(),
    },
  });
}
