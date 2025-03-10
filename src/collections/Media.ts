import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import type { CollectionConfig } from "payload";
import { fileURLToPath } from "url";

import { administrator } from "@/access/administrator";

import { anyone } from "../access/anyone";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  access: {
    create: administrator,
    delete: administrator,
    read: anyone,
    update: administrator,
  },
  fields: [
    {
      name: "alt",
      required: true,
      type: "text",
    },
    {
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
        },
      }),
      name: "caption",
      type: "richText",
    },
  ],
  slug: "media",
  upload: {
    adminThumbnail: "thumbnail",

    focalPoint: true,

    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        height: 500,
        name: "square",
        width: 500,
      },
      {
        name: "small",
        width: 600,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 1400,
      },
      {
        name: "xlarge",
        width: 1920,
      },
      {
        crop: "center",
        height: 630,
        name: "og",
        width: 1200,
      },
    ],
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, "../../public/media"),
  },
};
