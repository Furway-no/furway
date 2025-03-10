import type { CollectionConfig } from "payload";

import { administrator } from "@/access/administrator";
import { authenticated } from "@/access/authenticated";

export const Users: CollectionConfig = {
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
      defaultValue: "user",
      name: "role",
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
      required: true,
      type: "select",
    },
  ],
  slug: "users",
  timestamps: true,
};
