import { z } from 'zod';

import { UriSchema } from './primitives';

export type Eip7572 = {
  name: string;
  symbol?: string | null;
  description?: string | null;
  image?: string | null;
  banner_image?: string | null;
  featured_image?: string | null;
  external_link?: string | null;
  collaborators?: string[] | null;
};

export const Eip7572Schema = z.object({
  name: z.string().describe('The name of the contract.'),
  symbol: z.string().describe('The symbol of the contract.'),
  description: z.string().describe('The description of the contract.'),
  image: UriSchema.describe(
    'A URI pointing to a resource with mime type image/* that represents the contract, typically displayed as a profile picture for the contract.',
  ),
  banner_image: UriSchema.describe(
    'A URI pointing to a resource with mime type image/* that represents the contract, displayed as a banner image for the contract.',
  ),
  featured_image: UriSchema.describe(
    'A URI pointing to a resource with mime type image/* that represents the featured image for the contract, typically used for a highlight section.',
  ),
  external_link: UriSchema.describe('The external link of the contract.'),
  collaborators: z
    .array(UriSchema)
    .describe(
      'An array of Ethereum addresses representing collaborators (authorized editors) of the contract.',
    ),
});
