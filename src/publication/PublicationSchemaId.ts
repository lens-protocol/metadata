import { SchemasRoot } from '../constants';

const location = `${SchemasRoot}/publications`;

/**
 * A list of all the publication schema ids (past and present).
 */
export enum PublicationSchemaId {
  THREE_D_LATEST = `${location}/3d/3.0.0.json`,
  ARTICLE_LATEST = `${location}/article/3.0.0.json`,
  AUDIO_LATEST = `${location}/audio/3.0.0.json`,
  CHECKING_IN_LATEST = `${location}/checking-in/3.0.0.json`,
  EMBED_LATEST = `${location}/embed/3.0.0.json`,
  EVENT_LATEST = `${location}/event/3.0.0.json`,
  IMAGE_LATEST = `${location}/image/3.0.0.json`,
  LINK_LATEST = `${location}/link/3.0.0.json`,
  LIVESTREAM_LATEST = `${location}/livestream/3.0.0.json`,
  MINT_LATEST = `${location}/mint/3.0.0.json`,
  SPACE_LATEST = `${location}/space/3.0.0.json`,
  STORY_LATEST = `${location}/story/3.0.0.json`,
  TRANSACTION_LATEST = `${location}/transaction/3.0.0.json`,
  TEXT_ONLY_LATEST = `${location}/text-only/3.0.0.json`,
  VIDEO_LATEST = `${location}/video/3.0.0.json`,
}
