import { faker } from '@faker-js/faker';

import { SchemasRoot } from '../../constants.js';
import { type AccountMetadata, AccountMetadataSchema } from '../AccountMetadataSchema.js';

export function mockAccountMetadata(): AccountMetadata {
  return AccountMetadataSchema.parse({
    $schema: `${SchemasRoot}/account/1.0.0.json`,
    lens: {
      id: faker.string.uuid(),
    },
  });
}
