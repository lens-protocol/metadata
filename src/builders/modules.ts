import { evaluate } from './ValidationError';
import { RecursiveUnbrand } from './utils';
import { MetadataAttribute } from '../MetadataAttribute';
import { ModuleMetadata, ModuleMetadataSchema, ModuleSchemaId } from '../module';
import { Prettify } from '../utils';

/**
 * @private
 * @privateRemarks MUST stay very @private to produce usable docs
 */
type ModuleDetails = Prettify<RecursiveUnbrand<Omit<ModuleMetadata, '$schema'>>>;
/**
 * All {@link ModuleMetadata} fields without `$schema` a with:
 * - `attributes` defaults to an empty array
 */
export type ModuleOptions = ModuleDetails & {
  /**
   * An arbitrary bag of attributes you wish to add to the metadata.
   */
  attributes?: MetadataAttribute[];
};

/**
 * Creates a valid ModuleMetadata.
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 *
 * @example
 * ```ts
 * const metadata = module({
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
export function module({ attributes = [], ...others }: ModuleOptions): ModuleMetadata {
  return evaluate(
    ModuleMetadataSchema.safeParse({
      $schema: ModuleSchemaId.LATEST,
      attributes,
      ...others,
    }),
  );
}
