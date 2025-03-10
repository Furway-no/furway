import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block, Field } from "payload";

import { link } from "@/fields/link";

const columnFields: Field[] = [
  {
    defaultValue: "full",
    name: "size",
    options: [
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Full",
        value: "full",
      },
    ],
    type: "select",
  },
  {
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          EXPERIMENTAL_TableFeature(),
        ];
      },
    }),
    label: false,
    name: "richText",
    type: "richText",
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
];

export const Content: Block = {
  fields: [
    {
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
      name: "columns",
      type: "array",
    },
  ],
  interfaceName: "ContentBlock",
  slug: "content",
};
