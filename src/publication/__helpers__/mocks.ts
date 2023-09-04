import { faker } from '@faker-js/faker';

import {
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
