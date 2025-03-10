import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig } from "payload";

import { administrator } from "@/access/administrator";
import { ProfileGrid } from "@/blocks/ProfileGrid/config";
import { slugField } from "@/fields/slug";
import { hero } from "@/heros/config";
import { populatePublishedBy } from "@/hooks/populatePublishedBy";

import { administratorOrPublished } from "../../access/administratorOrPublished";
import { Archive } from "../../blocks/ArchiveBlock/config";
import { CallToAction } from "../../blocks/CallToAction/config";
import { Content } from "../../blocks/Content/config";
import { FormBlock } from "../../blocks/Form/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";

export const Pages: CollectionConfig<"pages"> = {
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
          collection: "pages",
          req,
          slug: typeof data?.slug === "string" ? data.slug : "",
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        collection: "pages",
        req,
        slug: typeof data?.slug === "string" ? data.slug : "",
      }),
    useAsTitle: "title",
  },

  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
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
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              admin: {
                initCollapsed: true,
              },
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, ProfileGrid],
              name: "layout",
              required: true,
              type: "blocks",
            },
          ],
          label: "Content",
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
        position: "sidebar",
      },
      name: "publishedAt",
      type: "date",
    },
    {
      admin: {
        condition: (data) => Boolean(data?.publishedBy),
        position: "sidebar",
        readOnly: true,
      },
      name: "publishedBy",
      relationTo: "users",
      type: "relationship",
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
    beforeChange: [populatePublishedAt, populatePublishedBy],
  },
  slug: "pages",
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
