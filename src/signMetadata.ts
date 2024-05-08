import stringify from 'json-stable-stringify';

import { ProfileMetadata } from './profile';
import { MirrorMetadata, PublicationMetadata } from './publication';

/**
 * Returns a deterministic message from the `metadata.lens` object.
 *
 * The message can be used in a signature to prove the origin of the Lens portion of the metadata.
 *
 * @param metadata - the metadata object
 * @returns the message
 */
export function lensMessage(
  metadata: MirrorMetadata | ProfileMetadata | PublicationMetadata,
): string {
  return stringify(metadata.lens);
}

/**
 * A function that signs a message.
 */
export type SignMessage = (message: string) => Promise<string>;

/**
 * Signs a Lens metadata object using the provided `signMessage` function.
 *
 * @param metadata - the metadata object
 * @param signMessage - the function that signs a message
 * @returns the signed Lens Metadata object
 */
export async function signMetadata<
  TMetadata extends MirrorMetadata | ProfileMetadata | PublicationMetadata,
>(metadata: TMetadata, signMessage: SignMessage): Promise<TMetadata> {
  const message = lensMessage(metadata);

  return {
    ...metadata,
    signature: await signMessage(message),
  };
}
