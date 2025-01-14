import { SchemasRoot } from '../constants';

/**
 * The Lens Rule metadata schema id.
 */
export enum RuleMetadataSchemaId {
  FEED_LATEST = `${SchemasRoot}/rules/feed/1.0.0.json`,
  GRAPH_LATEST = `${SchemasRoot}/rules/graph/1.0.0.json`,
  GROUP_LATEST = `${SchemasRoot}/rules/group/1.0.0.json`,
  NAMESPACE_LATEST = `${SchemasRoot}/rules/namespace/1.0.0.json`,
  POST_LATEST = `${SchemasRoot}/rules/post/1.0.0.json`,
  FOLLOW_LATEST = `${SchemasRoot}/rules/follow/1.0.0.json`,
}
