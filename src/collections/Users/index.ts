import type { CollectionConfig } from "payload";

import { administrator } from "@/access/administrator";
import { authenticated } from "@/access/authenticated";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: administrator,
    create: administrator,
    delete: administrator,
    read: authenticated,
    update: administrator,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Admin", // FULL ACCESS
          value: "admin",
        },
        {
          label: "Developer", // Debugging and testing role
          value: "developer",
        },
        {
          label: "Team Lead",
          value: "teamLead",
        },
        {
          label: "Volunteer",
          value: "volunteer",
        },
        {
          label: "User",
          value: "user",
        },
      ],
      defaultValue: "user",
      required: true,
    },
  ],
  timestamps: true,
};
