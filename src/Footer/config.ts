import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";

import { revalidateFooter } from "./hooks/revalidateFooter";

export const Footer: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      admin: {
        components: {
          RowLabel: "@/Footer/RowLabel#RowLabel",
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
    afterChange: [revalidateFooter],
  },
  slug: "footer",
};
