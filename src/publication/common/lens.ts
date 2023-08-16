import { z } from 'zod';

import { AppIdSchema, LocaleSchema, markdown, notEmptyString } from './primitives.js';

export enum PublicationContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}

export enum MetadataAttributeType {
  Boolean = 'Boolean',
  Date = 'Date',
  Number = 'Number',
  String = 'String',
  JSON = 'JSON',
}

export const MetadataAttributeSchema = z.object(
  {
    type: z.nativeEnum(MetadataAttributeType, { description: 'The type of the attribute.' }),

    key: notEmptyString("The attribute's unique identifier."),

    value: notEmptyString(
      "The attribute'a serialized value. " +
        "It's consumer responsibility to deserialize it based on the `type` field.",
    ),
  },
  { description: 'An arbitrary attribute.' },
);
export type MetadataAttribute = z.infer<typeof MetadataAttributeSchema>;

export const MetadataCommonSchema = z.object(
  {
    metadata_id: notEmptyString(
      'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
    ),

    content: markdown('Optional markdown content.').optional(),

    attributes: MetadataAttributeSchema.array()
      .min(1)
      .optional()
      .describe(
        'An optional bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
          'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
      ),

    locale: LocaleSchema,

    tags: notEmptyString().array().optional().describe('An arbitrary list of tags.'),

    contentWarning: z
      .nativeEnum(PublicationContentWarning, { description: 'Specify a content warning.' })
      .optional(),

    hideFromFeed: z
      .boolean({
        description: 'Determine if the publication should not be shown in any feed.',
      })
      .optional(),

    /**
     * Ability to only show when you filter on your app id
     * This is useful for apps that want to show only their content on their apps
     */
    globalReach: z
      .boolean({
        description:
          'Ability to only show when you filter on your App Id. ' +
          'This is useful for apps that want to show only their content on their apps.',
      })
      .optional(),

    appId: AppIdSchema.optional(),
  },
  { description: 'The Lens specific metadata details.' },
);
