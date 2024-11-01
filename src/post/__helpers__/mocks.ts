import { faker } from '@faker-js/faker';

import {
  PostMainFocus,
  PostSchemaId,
  TextOnlyMetadata,
  TextOnlySchema,
} from '../index.js';

export function mockTextOnlyMetadata(): TextOnlyMetadata {
  return TextOnlySchema.parse({
    $schema: PostSchemaId.TEXT_ONLY_LATEST,
    lens: {
      id: faker.string.uuid(),
      mainContentFocus: PostMainFocus.TEXT_ONLY,
      content: faker.lorem.sentence(),
      locale: 'en',
    },
  });
}
