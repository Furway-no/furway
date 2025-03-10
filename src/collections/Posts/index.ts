import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { administrator } from "@/access/administrator";
import { slugField } from "@/fields/slug";

import { administratorOrPublished } from "../../access/administratorOrPublished";
import { Banner } from "../../blocks/Banner/config";
import { Code } from "../../blocks/Code/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { populateAuthors } from "./hooks/populateAuthors";
import { revalidateDelete, revalidatePost } from "./hooks/revalidatePost";

export const Posts: CollectionConfig<"posts"> = {
  access: {
    create: administrator,
    delete: administrator,
    read: administratorOrPublished,
    update: administrator,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          collection: "posts",
          req,
          slug: typeof data?.slug === "string" ? data.slug : "",
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        collection: "posts",
        req,
        slug: typeof data?.slug === "string" ? data.slug : "",
      }),
    useAsTitle: "title",
  },

  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    categories: true,
    meta: {
      description: true,
      image: true,
    },
    slug: true,
    title: true,
  },

  fields: [
    {
      name: "title",
      required: true,
      type: "text",
    },
    {
      tabs: [
        {
          fields: [
            {
              name: "heroImage",
              relationTo: "media",
              type: "upload",
            },
            {
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              name: "content",
              required: true,
              type: "richText",
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              name: "relatedPosts",
              relationTo: "posts",
              type: "relationship",
            },
            {
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              name: "categories",
              relationTo: "categories",
              type: "relationship",
            },
          ],
          label: "Meta",
        },
        {
          fields: [
            OverviewField({
              descriptionPath: "meta.description",
              imagePath: "meta.image",
              titlePath: "meta.title",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              descriptionPath: "meta.description",

              // if the `generateUrl` function is configured
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: "meta.title",
            }),
          ],
          label: "SEO",
          name: "meta",
        },
      ],
      type: "tabs",
    },
    {
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
      name: "publishedAt",
      type: "date",
    },
    {
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      name: "authors",
      relationTo: "users",
      type: "relationship",
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
      ],
      name: "populatedAuthors",
      type: "array",
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
    afterRead: [populateAuthors],
  },
  slug: "posts",
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
