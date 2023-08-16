const location = 'https://json-schemas.lens.dev/publications';

export enum SchemaId {
  THREE_D = `${location}/3d/1-0.0.json`,
  ARTICLE = `${location}/article/1-0.0.json`,
  AUDIO = `${location}/audio/1-0.0.json`,
  CHECKING_IN = `${location}/checking-in/1-0.0.json`,
  EMBED = `${location}/embed/1-0.0.json`,
  EVENT = `${location}/event/1-0.0.json`,
  IMAGE = `${location}/image/1-0.0.json`,
  LINK = `${location}/link/1-0.0.json`,
  LIVESTREAM = `${location}/livestream/1-0.0.json`,
  MINT = `${location}/mint/1-0.0.json`,
  SPACE = `${location}/space/1-0.0.json`,
  STORY = `${location}/story/1-0.0.json`,
  TRANSACTION = `${location}/transaction/1-0.0.json`,
  TEXT_ONLY = `${location}/text-only/1-0-0.json`,
}
