import { evaluate } from './ValidationError';
import { OpenActionMetadataSchema, OpenActionSchemaId, OpenActionMetadata } from '../open-actions';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type OpenActionDetails = Omit<OpenActionMetadata, '$schema'>;

/**
 * Creates a valid OpenActionMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = openAction({
 *  name: 'My Open Action',
 *  title: 'This is my Open Action',
 *  content: 'Get ready for the future of social interaction!',
 *  authors: ['awesome-dev@lens.xyz'],
 *  initializeABI: [
 *    {
 *      name: 'address',
 *      type: 'address',
 *      indexed: true,
 *    },
 *    {
 *      name: 'price',
 *      type: 'uint256',
 *      indexed: true,
 *    }],
 *  processABI: [
 *    {
 *      name: 'collector',
 *      type: 'address',
 *      indexed: true,
 *    }]
 * });
 */
export function openAction({ attributes = [], ...others }: OpenActionDetails): OpenActionMetadata {
  return evaluate(
    OpenActionMetadataSchema.safeParse({
      $schema: OpenActionSchemaId.LATEST,
      attributes,
      ...others,
    }),
  );
}
