import { evaluate } from './ValidationError';
import { RecursiveUnbrand } from './utils';
import { MetadataAttribute } from '../MetadataAttribute';
import { OpenActionMetadataSchema, OpenActionSchemaId, OpenActionMetadata } from '../open-actions';
import { Prettify } from '../utils';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type OpenActionDetails = Prettify<RecursiveUnbrand<Omit<OpenActionMetadata, '$schema'>>>;
/**
 * All {@link OpenActionMetadata} fields without `$schema` a with:
 * - `attributes` defaults to an empty array
 */
export type OpenActionOptions = OpenActionDetails & {
  /**
   * The attributes of the Open Action.
   */
  attributes?: MetadataAttribute[];
};

/**
 * Creates a valid OpenActionMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = openAction({
 *   name: 'My Open Action',
 *   title: 'This is my Open Action',
 *   description: 'Get ready for the future of social interaction!',
 *   authors: ['awesome-dev@lens.xyz'],
 *   initializeCalldataABI: JSON.stringify([
 *     {
 *       type: 'address',
 *       name: 'address',
 *     },
 *     {
 *       type: 'uint256',
 *       name: 'price',
 *     },
 *   ]),
 *   processCalldataABI: JSON.stringify([
 *     {
 *       type: 'address',
 *       name: 'collector',
 *     },
 *   ]),
 * });
 * ```
 */
export function openAction({ attributes = [], ...others }: OpenActionOptions): OpenActionMetadata {
  return evaluate(
    OpenActionMetadataSchema.safeParse({
      $schema: OpenActionSchemaId.LATEST,
      attributes,
      ...others,
    }),
  );
}
