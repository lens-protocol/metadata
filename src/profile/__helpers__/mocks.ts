import { faker } from '@faker-js/faker';

import { SchemasRoot } from '../../constants.js';
import { ProfileMetadata, ProfileMetadataSchema } from '../ProfileMetadataSchema.js';

export function mockProfileMetadata(): ProfileMetadata {
  return ProfileMetadataSchema.parse({
    $schema: `${SchemasRoot}/profile/2.0.0.json`,
    lens: {
      id: faker.string.uuid(),
    },
  });
}
