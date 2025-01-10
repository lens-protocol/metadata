import { z } from 'zod';

import { EvmAddress, EvmAddressSchema, URI, URISchema } from '../primitives';

export type Eip7572 = {
  name: string;
  symbol?: string | null;
  description?: string | null;
  image?: URI | null;
  banner_image?: URI | null;
  featured_image?: URI | null;
  external_link?: URI | null;
  collaborators?: EvmAddress[] | null;
};

/**
 * @internal
 */
export function eip7572SchemaWith<Augmentation extends z.ZodRawShape>(augmentation: Augmentation) {
  return z
    .object({
      name: z.string().describe('The name of the contract.'),
      description: z.string().optional().describe('The description of the contract.'),
      symbol: z.string().optional().describe('The symbol of the contract.'),
      image: URISchema.optional().describe(
        'A URI pointing to a resource with mime type image/* that represents the contract, typically displayed as a profile picture for the contract.',
      ),
      banner_image: URISchema.optional().describe(
        'A URI pointing to a resource with mime type image/* that represents the contract, displayed as a banner image for the contract.',
      ),
      featured_image: URISchema.optional().describe(
        'A URI pointing to a resource with mime type image/* that represents the featured image for the contract, typically used for a highlight section.',
      ),
      external_link: URISchema.optional().describe('The external link of the contract.'),
      collaborators: EvmAddressSchema.array()
        .optional()
        .describe(
          'An array of Ethereum addresses representing collaborators (authorized editors) of the contract.',
        ),
    })
    .extend(augmentation);
}
