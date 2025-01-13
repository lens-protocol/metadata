import { faker } from '@faker-js/faker';

import {
  PostMainFocus,
  PostMetadataSchemaId,
  type TextOnlyMetadata,
  TextOnlySchema,
} from '../index.js';

export function mockTextOnlyMetadata(): TextOnlyMetadata {
  return TextOnlySchema.parse({
    $schema: PostMetadataSchemaId.TEXT_ONLY_LATEST,
    lens: {
      id: faker.string.uuid(),
      mainContentFocus: PostMainFocus.TEXT_ONLY,
      content: faker.lorem.sentence(),
      locale: 'en',
    },
  });
}
