import { Block } from "payload";

export const ProfileGrid: Block = {
  slug: "profileGridBlock",
  interfaceName: "ProfileGridBlock",
  fields: [
    {
      name: "heading",
      type: "text",
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "slotsFilled",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "volunteers",
          type: "array",
          fields: [
            {
              name: "name",
              type: "text",
            },
            {
              name: "role",
              type: "text",
            },
            {
              name: "url",
              type: "text",
            },
            {
              name: "bio",
              type: "text",
            },
            {
              name: "profilePicture",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
      ],
    },
  ],
  labels: {
    singular: "Profile Grid",
    plural: "Profile Grids",
  },
};
