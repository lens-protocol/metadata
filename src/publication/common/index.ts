import { z } from 'zod';

import { MetadataCommonSchema } from './lens.js';
import { MarketplaceMetadataSchema } from './marketplace.js';
import { SignatureSchema, mainContentFocus } from './primitives.js';

export * from './lens.js';
export * from './license.js';
export * from './marketplace.js';
export * from './media.js';
export * from './primitives.js';
export * from './timezones.js';

export function metadataDetailsWith<
  Augmentation extends { mainContentFocus: ReturnType<typeof mainContentFocus> },
>(augmentation: Augmentation) {
  return MetadataCommonSchema.extend(augmentation);
}

export function publicationWith<
  Augmentation extends {
    $schema: z.ZodLiteral<string>;
    lens: ReturnType<typeof metadataDetailsWith>;
  },
>(augmentation: Augmentation) {
  return MarketplaceMetadataSchema.extend({
    signature: SignatureSchema.optional(),
    ...augmentation,
  });
}
