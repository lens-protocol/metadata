import { faker } from '@faker-js/faker';

import {
  EvmAddress,
  NetworkAddress,
  LegacyProfileId,
  toChainId,
  toEvmAddress,
  toProfileId,
} from '../primitives';

export function mockProfileId(): LegacyProfileId {
  return toProfileId(faker.string.hexadecimal({ length: 2 }));
}

export function mockEvmAddress(): EvmAddress {
  return toEvmAddress(faker.string.hexadecimal({ length: 40 }));
}

export function mockNetworkAddress(overrides?: Partial<NetworkAddress>): NetworkAddress {
  return {
    address: mockEvmAddress(),
    chainId: toChainId(1),
    ...overrides,
  };
}
