import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";

import { revalidateHeader } from "./hooks/revalidateHeader";

export const Header: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      label: "Website Title",
      name: "title",
      required: false,
      type: "text",
    },
    {
      label: "Logo",
      name: "media",
      relationTo: "media",
      required: false,
      type: "upload",
    },
    {
      defaultValue: 32,
      label: "Max Logo Height",
      name: "maxHeight",
      required: false,
      type: "number",
    },
    {
      // max allowed links in header
      admin: {
        components: {
          RowLabel: "@/Header/RowLabel#RowLabel",
        },
        initCollapsed: true,
      },

      fields: [
        link({
          appearances: false,
        }),
      ],

      maxRows: 6,

      name: "navItems",
      type: "array",
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
  slug: "header",
};
