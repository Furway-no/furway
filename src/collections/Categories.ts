import type { CollectionConfig } from "payload";

import { administrator } from "@/access/administrator";
import { slugField } from "@/fields/slug";

import { anyone } from "../access/anyone";

export const Categories: CollectionConfig = {
  access: {
    create: administrator,
    delete: administrator,
    read: anyone,
    update: administrator,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      required: true,
      type: "text",
    },
    ...slugField(),
  ],
  slug: "categories",
};
