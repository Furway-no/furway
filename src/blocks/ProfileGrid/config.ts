import { Block } from "payload";

export const ProfileGrid: Block = {
  fields: [
    {
      name: "heading",
      type: "text",
    },
    {
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
              relationTo: "media",
              type: "upload",
            },
          ],
          name: "volunteers",
          type: "array",
        },
      ],
      name: "items",
      type: "array",
    },
  ],
  interfaceName: "ProfileGridBlock",
  labels: {
    plural: "Profile Grids",
    singular: "Profile Grid",
  },
  slug: "profileGridBlock",
};
