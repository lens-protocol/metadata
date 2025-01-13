import { faker } from '@faker-js/faker';

import { type EvmAddress, toEvmAddress } from '../primitives';

export function mockEvmAddress(): EvmAddress {
  return toEvmAddress(faker.string.hexadecimal({ length: 40 }));
}
