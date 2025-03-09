import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { slugField } from "@/fields/slug";
import { administrator } from "@/access/administrator";

export const Categories: CollectionConfig = {
  slug: "categories",
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
      type: "text",
      required: true,
    },
    ...slugField(),
  ],
};
