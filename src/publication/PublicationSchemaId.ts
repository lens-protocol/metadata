/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { SchemasRoot } from '../constants';

const location = `${SchemasRoot}/publications`;

/**
 * The latest major version of each publication schema.
 */
export enum StablePublicationSchemaMajorVersion {
  THREE_D = '3',
  ARTICLE = '3',
  AUDIO = '3',
  CHECKING_IN = '3',
  EMBED = '3',
  EVENT = '3',
  IMAGE = '3',
  LINK = '3',
  LIVESTREAM = '3',
  MINT = '3',
  SPACE = '3',
  STORY = '3',
  TRANSACTION = '3',
  TEXT_ONLY = '3',
  VIDEO = '3',
}

/**
 * A list of all the publication schema ids (past and present).
 */
export enum PublicationSchemaId {
  THREE_D_LATEST = `${location}/3d/${StablePublicationSchemaMajorVersion.THREE_D}.1.0.json`,
  THREE_D_3_0_0 = `${location}/3d/${StablePublicationSchemaMajorVersion.THREE_D}.0.0.json`,

  ARTICLE_LATEST = `${location}/article/${StablePublicationSchemaMajorVersion.ARTICLE}.1.0.json`,
  ARTICLE_3_0_0 = `${location}/article/${StablePublicationSchemaMajorVersion.ARTICLE}.0.0.json`,

  AUDIO_LATEST = `${location}/audio/${StablePublicationSchemaMajorVersion.AUDIO}.1.0.json`,
  AUDIO_3_0_0 = `${location}/audio/${StablePublicationSchemaMajorVersion.AUDIO}.0.0.json`,

  CHECKING_IN_LATEST = `${location}/checking-in/${StablePublicationSchemaMajorVersion.CHECKING_IN}.1.0.json`,
  CHECKING_IN_3_0_0 = `${location}/checking-in/${StablePublicationSchemaMajorVersion.CHECKING_IN}.0.0.json`,

  EMBED_LATEST = `${location}/embed/${StablePublicationSchemaMajorVersion.EMBED}.1.0.json`,
  EMBED_3_0_0 = `${location}/embed/${StablePublicationSchemaMajorVersion.EMBED}.0.0.json`,

  EVENT_LATEST = `${location}/event/${StablePublicationSchemaMajorVersion.EVENT}.1.0.json`,
  EVENT_3_0_0 = `${location}/event/${StablePublicationSchemaMajorVersion.EVENT}.0.0.json`,

  IMAGE_LATEST = `${location}/image/${StablePublicationSchemaMajorVersion.IMAGE}.1.0.json`,
  IMAGE_3_0_0 = `${location}/image/${StablePublicationSchemaMajorVersion.IMAGE}.0.0.json`,

  LINK_LATEST = `${location}/link/${StablePublicationSchemaMajorVersion.LINK}.1.0.json`,
  LINK_3_0_0 = `${location}/link/${StablePublicationSchemaMajorVersion.LINK}.0.0.json`,

  LIVESTREAM_LATEST = `${location}/livestream/${StablePublicationSchemaMajorVersion.LIVESTREAM}.1.0.json`,
  LIVESTREAM_3_0_0 = `${location}/livestream/${StablePublicationSchemaMajorVersion.LIVESTREAM}.0.0.json`,

  MINT_LATEST = `${location}/mint/${StablePublicationSchemaMajorVersion.MINT}.1.0.json`,
  MINT_3_0_0 = `${location}/mint/${StablePublicationSchemaMajorVersion.MINT}.0.0.json`,

  SPACE_LATEST = `${location}/space/${StablePublicationSchemaMajorVersion.SPACE}.1.0.json`,
  SPACE_3_0_0 = `${location}/space/${StablePublicationSchemaMajorVersion.SPACE}.0.0.json`,

  STORY_LATEST = `${location}/story/${StablePublicationSchemaMajorVersion.STORY}.1.0.json`,
  STORY_3_0_0 = `${location}/story/${StablePublicationSchemaMajorVersion.STORY}.0.0.json`,

  TRANSACTION_LATEST = `${location}/transaction/${StablePublicationSchemaMajorVersion.TRANSACTION}.1.0.json`,
  TRANSACTION_3_0_0 = `${location}/transaction/${StablePublicationSchemaMajorVersion.TRANSACTION}.0.0.json`,

  TEXT_ONLY_LATEST = `${location}/text-only/${StablePublicationSchemaMajorVersion.TEXT_ONLY}.1.0.json`,
  TEXT_ONLY_3_0_0 = `${location}/text-only/${StablePublicationSchemaMajorVersion.TEXT_ONLY}.0.0.json`,

  VIDEO_LATEST = `${location}/video/${StablePublicationSchemaMajorVersion.VIDEO}.1.0.json`,
  VIDEO_3_0_0 = `${location}/video/${StablePublicationSchemaMajorVersion.VIDEO}.0.0.json`,
}

const versionPattern = '\\d+\\.\\d+\\.\\d+';

/**
 * A list of all the publication schema ids (past and present).
 *
 * @enum
 */
export const PublicationSchemaIdRegex = {
  THREE_D: new RegExp(`${location}/3d/${versionPattern}.json`, 'g'),
  ARTICLE: new RegExp(`${location}/article/${versionPattern}.json`, 'g'),
  AUDIO: new RegExp(`${location}/audio/${versionPattern}.json`, 'g'),
  CHECKING_IN: new RegExp(`${location}/checking-in/${versionPattern}.json`, 'g'),
  EMBED: new RegExp(`${location}/embed/${versionPattern}.json`, 'g'),
  EVENT: new RegExp(`${location}/event/${versionPattern}.json`, 'g'),
  IMAGE: new RegExp(`${location}/image/${versionPattern}.json`, 'g'),
  LINK: new RegExp(`${location}/link/${versionPattern}.json`, 'g'),
  LIVESTREAM: new RegExp(`${location}/livestream/${versionPattern}.json`, 'g'),
  MINT: new RegExp(`${location}/mint/${versionPattern}.json`, 'g'),
  SPACE: new RegExp(`${location}/space/${versionPattern}.json`, 'g'),
  STORY: new RegExp(`${location}/story/${versionPattern}.json`, 'g'),
  TRANSACTION: new RegExp(`${location}/transaction/${versionPattern}.json`, 'g'),
  TEXT_ONLY: new RegExp(`${location}/text-only/${versionPattern}.json`, 'g'),
  VIDEO: new RegExp(`${location}/video/${versionPattern}.json`, 'g'),
} as const;
