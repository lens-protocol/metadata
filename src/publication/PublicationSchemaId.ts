import { SchemasRoot } from '../constants';

const location = `${SchemasRoot}/publications`;

export enum PublicationSchemaId {
  THREE_D_LATEST = `${location}/3d/1.0.0.json`,
  ARTICLE_LATEST = `${location}/article/1.0.0.json`,
  AUDIO_LATEST = `${location}/audio/1.0.0.json`,
  CHECKING_IN_LATEST = `${location}/checking-in/1.0.0.json`,
  EMBED_LATEST = `${location}/embed/1.0.0.json`,
  EVENT_LATEST = `${location}/event/1.0.0.json`,
  IMAGE_LATEST = `${location}/image/1.0.0.json`,
  LINK_LATEST = `${location}/link/1.0.0.json`,
  LIVESTREAM_LATEST = `${location}/livestream/1.0.0.json`,
  MINT_LATEST = `${location}/mint/1.0.0.json`,
  SPACE_LATEST = `${location}/space/1.0.0.json`,
  STORY_LATEST = `${location}/story/1.0.0.json`,
  TRANSACTION_LATEST = `${location}/transaction/1.0.0.json`,
  TEXT_ONLY_LATEST = `${location}/text-only/1-0-0.json`,
  VIDEO_LATEST = `${location}/video/1-0-0.json`,
}
